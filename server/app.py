#!/usr/bin/env python3

import os
from datetime import datetime, timezone
from enum import Enum

from config import api, app, bcrypt, db
from flask import (
    g,
    jsonify,
    make_response,
    request,
    send_from_directory,
    session,
)
from flask_restful import Resource
from helpers import find_falsey, find_req_fields, make_error, make_message
from messages import MsgKey
from models import Order, OrderProduct, Product, User

# reusable dummy hash to balance timing of authentications where the
# user email is found with ones where it is not found

DUMMY_HASH = bcrypt.generate_password_hash("dummy123").decode("utf-8")


# enums and namespaces


class Status(str, Enum):
    OPEN = "open"
    CANCELLED = "cancelled"
    SUBMITTED = "submitted"
    IN_PROCESS = "in_process"
    NON_OPEN = "non_open"


class ActionType:
    CHECKOUT = "checkout"
    REGISTER = "register"


class FieldNames:
    PASSWORD = "password"
    PASSWORD_CURRENT = "password_current"
    EMAIL = "email"
    USER_ID = "user_id"
    STATUS = "status"
    SCOPE = "scope"
    ACTION_TYPE = "action_type"
    ORDER_ID = "order_id"
    PRODUCT_ID = "product_id"
    QUANTITY = "quantity"


# helpers


def get_user(id):
    return db.session.get(User, id)


def get_product(id):
    return db.session.get(Product, id)


def get_order(id):
    return db.session.get(Order, id)


def get_order_prod(id):
    return db.session.get(OrderProduct, id)


@app.before_request
def load_user_id():
    g.user_id = session.get("user_id")
    # fetch the user if we have an ID
    g.user = get_user(g.user_id) if g.user_id else None


@app.errorhandler(ValueError)
def handle_value_error(e):
    return make_response(jsonify({"error": str(e)}), 422)


# views


class AllUsers(Resource):
    def post(self):
        if g.user:
            return make_error(MsgKey.UNAUTHORIZED, 403)

        required_fields = find_req_fields(User)
        if falsey := find_falsey(
            {k: request.json.get(k) for k in required_fields}
        ):
            return make_error(MsgKey.MISSING_FIELDS, 422, fields=falsey)

        data = request.json or {}
        email = data.get(FieldNames.EMAIL)
        if User.query.filter_by(email=email).first():
            return make_error(MsgKey.EMAIL_TAKEN, 422)

        new_user = User(**data)
        db.session.add(new_user)
        db.session.commit()

        action_type = request.args.get(FieldNames.ACTION_TYPE)
        if action_type == ActionType.REGISTER:
            session[FieldNames.USER_ID] = new_user.id

        return make_response(new_user.to_dict(), 201)


api.add_resource(AllUsers, "/users")


class UserById(Resource):
    def patch(self, id):
        if not g.user or g.user.role == "admin":
            return make_error(MsgKey.UNAUTHORIZED, 403)

        user = get_user(id)
        if not user:
            return make_error(MsgKey.ID_NOT_FOUND, 404)

        if user.id != g.user_id:
            return make_error(MsgKey.UNAUTHORIZED, 403)

        updates = request.json or {}
        if not updates:
            return make_error(MsgKey.NO_DATA)

        if FieldNames.PASSWORD in updates:
            password_current = updates.pop(FieldNames.PASSWORD_CURRENT, None)
            if not password_current or not user.authenticate(password_current):
                return make_error(MsgKey.INVALID_CREDS, 401)

        for k, v in updates.items():
            setattr(user, k, v)

        db.session.commit()
        return make_response(user.to_dict(), 200)


api.add_resource(UserById, "/users/<int:id>")


class Session(Resource):
    def get(self):
        user_id = g.user_id
        if not user_id:
            return make_response(jsonify(None), 200)

        user = get_user(user_id)
        if not user:
            return make_error(MsgKey.ID_NOT_FOUND, 404)

        return make_response(user.to_dict(), 200)

    def post(self):
        data = request.json or {}
        if not data:
            return make_error(MsgKey.NO_DATA, 400)

        required = [FieldNames.EMAIL, FieldNames.PASSWORD]
        if falsey := find_falsey({k: data.get(k) for k in required}):
            return make_error(MsgKey.MISSING_FIELDS, 422, fields=falsey)

        user = User.query.filter(
            User.email == data.get(FieldNames.EMAIL)
        ).first()
        if not user:
            bcrypt.check_password_hash(
                DUMMY_HASH, data.get(FieldNames.PASSWORD)
            )
            return make_error(MsgKey.INVALID_CREDS, 401)

        if not user.authenticate(data.get(FieldNames.PASSWORD)):
            return make_error(MsgKey.INVALID_CREDS, 401)

        session[FieldNames.USER_ID] = user.id
        return make_response(user.to_dict(), 200)

    def delete(self):
        session.clear()
        return make_message(MsgKey.LOGGED_OUT)


api.add_resource(Session, "/session")


class AllProducts(Resource):
    def get(self):
        products = [i.to_dict() for i in Product.query.all()]
        return make_response(products, 200)

    def post(self):
        if not g.user or g.user.role != "admin":
            return make_error(MsgKey.UNAUTHORIZED, 403)

        required_fields = find_req_fields(Product)
        if falsey := find_falsey(
            {k: request.json.get(k) for k in required_fields}
        ):
            return make_error(MsgKey.MISSING_FIELDS, 422, fields=falsey)

        data = request.json or {}
        new_product = Product(**data)
        db.session.add(new_product)
        db.session.commit()

        return make_response(new_product.to_dict(), 201)


api.add_resource(AllProducts, "/products")


class ProductById(Resource):
    def patch(self, id):
        if not g.user or g.user.role != "admin":
            return make_error(MsgKey.UNAUTHORIZED, 403)

        product = get_product(id)
        if not product:
            return make_error(MsgKey.ID_NOT_FOUND, 404)

        updates = request.json or {}
        if not updates:
            return make_error(MsgKey.NO_DATA, 400)

        for k, v in updates.items():
            setattr(product, k, v)

        db.session.commit()
        return make_response(product.to_dict(), 200)

    def delete(self, id):
        if not g.user or g.user.role != "admin":
            return make_error(MsgKey.UNAUTHORIZED, 403)

        product = get_product(id)
        if not product:
            return make_error(MsgKey.ID_NOT_FOUND, 404)

        db.session.delete(product)
        db.session.commit()

        return make_message(MsgKey.RECORD_DELETED)


api.add_resource(ProductById, "/products/<int:id>")


class AllOrders(Resource):
    def get(self):
        if not g.user or g.user.role == "admin":
            return make_error(MsgKey.UNAUTHORIZED, 403)

        user_id = g.user_id
        if not user_id:
            return make_error(MsgKey.NOT_AUTH, 401)

        status = request.args.get(FieldNames.STATUS)
        scope = request.args.get(FieldNames.SCOPE)

        query = Order.query.filter(Order.user_id == user_id)
        if status == Status.OPEN:
            query = query.filter(Order.status == Status.OPEN)
        if status == Status.NON_OPEN:
            query = query.filter(Order.status != Status.OPEN)

        user_orders = query.all()

        kwargs = (
            {"rules": ("-order_products", "-user")}
            if scope == "shallow"
            else {}
        )
        order_dicts = [o.to_dict(**kwargs) for o in user_orders]

        return make_response(order_dicts, 200)

    def post(self):
        if not g.user or g.user.role == "admin":
            return make_error(MsgKey.UNAUTHORIZED, 403)

        user_id = g.user_id
        if not user_id:
            return make_error(MsgKey.NOT_AUTH, 401)

        if g.user.role == "admin":
            return make_error(MsgKey.ADMIN_BASKET_FORBIDDEN, 403)

        new_order = Order(user_id=user_id)
        db.session.add(new_order)
        db.session.commit()

        return make_response(new_order.to_dict(), 201)


api.add_resource(AllOrders, "/orders")


class OrderById(Resource):
    def get(self, id):
        if not g.user or g.user.role == "admin":
            return make_error(MsgKey.UNAUTHORIZED, 403)

        order = get_order(id)
        if not order:
            return make_error(MsgKey.ID_NOT_FOUND, 404)

        if order.user_id != g.user_id:
            return make_error(MsgKey.UNAUTHORIZED, 403)

        response = order.to_dict(
            rules=(
                "order_products",
                "-order_products.order",
            )
        )

        return make_response(response, 200)

    def patch(self, id):
        if not g.user or g.user.role == "admin":
            return make_error(MsgKey.UNAUTHORIZED, 403)

        order = get_order(id)
        if not order:
            return make_error(MsgKey.ID_NOT_FOUND, 404)

        if order.user_id != g.user_id:
            return make_error(MsgKey.UNAUTHORIZED, 403)

        updates = request.json or {}
        if not updates:
            return make_error(MsgKey.NO_DATA, 400)

        action_type = request.args.get(FieldNames.ACTION_TYPE)
        if action_type == ActionType.CHECKOUT:
            if order.status != Status.OPEN:
                return make_error(
                    MsgKey.INVALID_STATUS,
                    400,
                    expected=Status.OPEN,
                    got=order.status,
                )

            if not len(order.order_products):
                return make_error(MsgKey.EMPTY_ORDER, 400)

            for op in order.order_products:
                op.price_cents = op.product.price_cents

            order.final_total_cents = sum(
                op.price_cents * op.quantity for op in order.order_products
            )
            order.product_count = sum(
                op.quantity for op in order.order_products
            )
            order.created_at = datetime.now(timezone.utc)
        # only 'submitted' orders can be cancelled because they have not been prepared yet
        if (
            updates.get(FieldNames.STATUS) == Status.CANCELLED
            and order.status != Status.SUBMITTED
        ):
            return make_error(
                MsgKey.INVALID_STATUS,
                422,
                expected=Status.SUBMITTED,
                got=order.status,
            )

        for k, v in updates.items():
            setattr(order, k, v)

        db.session.commit()

        return make_response(order.to_dict(), 200)

    def delete(self, id):
        if not g.user or g.user.role == "admin":
            return make_error(MsgKey.UNAUTHORIZED, 403)

        order = get_order(id)
        if not order:
            return make_error(MsgKey.ID_NOT_FOUND, 404)

        if order.user_id != g.user_id:
            return make_error(MsgKey.UNAUTHORIZED, 403)

        legal_deletion_statuses = [Status.CANCELLED, Status.OPEN]

        if order.status not in legal_deletion_statuses:
            return make_error(
                MsgKey.INVALID_STATUS,
                422,
                expected=(", ").join(legal_deletion_statuses),
                got=order.status,
            )

        db.session.delete(order)
        db.session.commit()

        return make_message(MsgKey.RECORD_DELETED)


api.add_resource(OrderById, "/orders/<int:id>")


class AllOrderProducts(Resource):
    def get(self):
        if not g.user or g.user.role == "admin":
            return make_error(MsgKey.UNAUTHORIZED, 403)

        order_id = request.args.get(FieldNames.ORDER_ID)
        if not order_id:
            return make_error(MsgKey.NO_ORDER_ID, 400)

        order = get_order(order_id)

        if not order:
            return make_error(MsgKey.ID_NOT_FOUND, 404)

        if order.user_id != g.user_id:
            return make_error(MsgKey.UNAUTHORIZED, 403)

        order_products = order.order_products

        serialized_order_products = [
            op.to_dict(
                rules=(
                    "-product",
                    "product.name",
                    "product.image_filename",
                    "product.price_cents",
                )
            )
            for op in order_products
        ]

        return make_response(serialized_order_products, 200)

    def post(self):
        if not g.user or g.user.role == "admin":
            return make_error(MsgKey.UNAUTHORIZED, 403)

        required_fields = [FieldNames.ORDER_ID, FieldNames.PRODUCT_ID]
        if falsey := find_falsey(
            {k: request.json.get(k) for k in required_fields}
        ):
            return make_error(MsgKey.MISSING_FIELDS, 422, fields=falsey)

        data = request.json or {}

        order = get_order(data.get(FieldNames.ORDER_ID))
        if order.user_id != g.user_id or g.user.role == "admin":
            return make_error(MsgKey.UNAUTHORIZED, 403)

        product = get_product(data.get(FieldNames.PRODUCT_ID))
        if not product:
            return make_error(MsgKey.ID_NOT_FOUND, 404)

        new_order_product = OrderProduct(**data)
        db.session.add(new_order_product)
        db.session.commit()

        return make_response(new_order_product.to_dict(), 201)


api.add_resource(AllOrderProducts, "/order_products")


class OrderProductById(Resource):
    def patch(self, id):
        order_product = get_order_prod(id)
        if not order_product:
            return make_error(MsgKey.ID_NOT_FOUND, 404)

        if not g.user or g.user.role == "admin":
            return make_error(MsgKey.UNAUTHORIZED, 403)

        if order_product.order.user_id != g.user_id:
            return make_error(MsgKey.UNAUTHORIZED, 403)

        updates = request.json or {}
        if not updates:
            return make_error(MsgKey.NO_DATA, 400)

        has_quantity = FieldNames.QUANTITY in updates

        if has_quantity:
            try:
                new_quantity = int(updates.get(FieldNames.QUANTITY))
            except (TypeError, ValueError):
                context = {
                    "type": type(updates.get(FieldNames.QUANTITY)).__name__
                }
                return make_error(MsgKey.INVALID_QUANTITY, 400, **context)

            if len(updates) > 1:
                return make_error(MsgKey.INVALID_COMBINATION, 400)

        if has_quantity and new_quantity <= 0:
            db.session.delete(order_product)
            db.session.commit()
            return make_response({"id": id, "status": "deleted"}, 200)

        for k, v in updates.items():
            setattr(order_product, k, v)

        db.session.commit()
        return make_response(order_product.to_dict(), 200)

    def delete(self, id):
        order_product = get_order_prod(id)
        if not order_product:
            return make_error(MsgKey.ID_NOT_FOUND, 404)

        if not g.user or g.user.role == "admin":
            return make_error(MsgKey.UNAUTHORIZED, 403)

        if order_product.order.user_id != g.user_id:
            return make_error(MsgKey.UNAUTHORIZED, 403)

        db.session.delete(order_product)
        db.session.commit()

        return make_message(MsgKey.RECORD_DELETED)


api.add_resource(OrderProductById, "/order_products/<int:id>")


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    # check if file exists
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        # send index.html if the file doesn't exist
        return send_from_directory(app.static_folder, "index.html")


@app.errorhandler(404)
def handle_404(e):
    if not request.path.startswith("/api/"):
        return send_from_directory(app.static_folder, "index.html")
    return e


if __name__ == "__main__":
    app.run(port=5555, debug=True)
