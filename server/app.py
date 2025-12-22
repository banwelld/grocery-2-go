#!/usr/bin/env python3

import json
from datetime import datetime, timezone
from enum import Enum

from config import api, app, bcrypt, db
from flask import make_response, request, session
from flask_restful import Resource
from helpers import find_falsey, find_req_fields
from models import Order, OrderProduct, Product, User

# get error messages from messages.json

with open("messages.json", "r") as m:
    msg = json.load(m)

# reusable dummy hash to balance timing of authentications where the
# user email is found with ones where it is not found

DUMMY_HASH = bcrypt.generate_password_hash("dummy123").decode("utf-8")


# arg enums


class ActionType(Enum):
    CHECKOUT = "checkout"


class Status(Enum):
    OPEN = "open"


# helpers


def get_user(id):
    return db.session.get(User, id)


def get_product(id):
    return db.session.get(Product, id)


def get_order(id):
    return db.session.get(Order, id)


def get_order_prod(id):
    return db.session.get(OrderProduct, id)


# authentication protection


class AuthResource(Resource):
    def dispatch_request(self, *args, **kwargs):
        if "user_id" not in session:
            return make_response({"error": msg.get("UNAUTHORIZED")}, 401)
        return super().dispatch_request(*args, **kwargs)

    @property
    def current_user(self):
        return get_user(session.get("user_id"))


# views


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


class AllUsers(Resource):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return make_response({"error": msg.get("NOT_AUTH")}, 401)

        user = get_user(user_id)
        if not user:
            return make_response({"error": msg.get("ID_NOT_FOUND")}, 401)

        return make_response(user.to_dict(), 200)

    def post(self):
        fields = find_req_fields(User)
        data = {k: request.json.get(k) for k in fields}

        if falsey := find_falsey(data):
            return make_response(
                {"error": msg.get("MISSING_FIELDS").format(fields="".join(falsey))},
                422,
            )

        new_user = User(**data)
        db.session.add(new_user)
        db.session.commit()

        return make_response(new_user.to_dict(), 201)


api.add_resource(AllUsers, "/users")


class Session(Resource):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return make_response({"error": msg.get("NOT_AUTH")}, 401)

        user = get_user(user_id)
        if not user:
            return make_response({"error": msg.get("ID_NOT_FOUND")}, 401)

        return make_response(user.to_dict(), 200)

    def post(self):
        data = request.json or {}
        if not data:
            return make_response({"error": msg.get("NO_DATA")}, 400)

        required = ["email", "password"]
        if falsey := find_falsey({k: data.get(k) for k in required}):
            return make_response(
                {"error": msg.get("MISSING_FIELDS").format(fields="".join(falsey))},
                422,
            )

        user = User.query.filter(User.email == data.get("email")).first()
        if not user:
            bcrypt.check_password_hash(DUMMY_HASH, data.get("password"))
            return make_response({"error": msg.get("INVALID_CREDS")}, 401)

        if not user.authenticate(data.get("password")):
            return make_response({"error": msg.get("INVALID_CREDS")}, 401)

        session["user_id"] = user.id
        return make_response(user.to_dict(), 200)

    def delete(self):
        session.pop("user_id", None)
        return make_response({"message": msg.get("LOGGED_OUT")}, 200)


api.add_resource(Session, "/session")


class AllProducts(Resource):
    def get(self):
        products = [i.to_dict() for i in Product.query.all()]
        return make_response(products, 200)

    def post(self):
        fields = find_req_fields(Product)
        data = {k: request.json.get(k) for k in fields}

        if falsey := find_falsey(data):
            return make_response(
                {"error": msg.get("MISSING_FIELDS").format(fields="".join(falsey))},
                422,
            )

        new_product = Product(**data)
        db.session.add(new_product)
        db.session.commit()

        return make_response(new_product.to_dict(), 201)


api.add_resource(AllProducts, "/products")


class ProductById(Resource):
    def get(self, id):
        product = get_product(id)
        if not product:
            return make_response({"error": msg.get("ID_NOT_FOUND")}, 404)

        return make_response(product.to_dict(), 200)


api.add_resource(ProductById, "/products/<int:id>")


class AllOrders(Resource):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return make_response({"error": msg.get("NOT_AUTH")}, 401)

        status = request.args.get("status")

        query = Order.query.filter(Order.user_id == user_id)
        if status == "open":
            query = query.filter(Order.status == "open")

        user_orders = query.all()
        order_dicts = [o.to_dict() for o in user_orders]

        return make_response(order_dicts, 200)

    def post(self):
        user_id = session.get("user_id")
        if not user_id:
            return make_response({"error": msg.get("NOT_AUTH")}, 401)

        new_order = Order(user_id=user_id)
        db.session.add(new_order)
        db.session.commit()

        return make_response(new_order.to_dict(), 201)


api.add_resource(AllOrders, "/orders")


class OrderById(Resource):
    def get(self, id):
        order = get_order(id)
        if not order:
            return make_response({"error": msg.get("NO_ORDER")}, 404)

        if order.user_id != session.get("user_id"):
            return make_response({"error": msg.get("USER_ID_MISMATCH")}, 403)

        response = order.to_dict(
            rules=(
                "order_products",
                "-order_products.order",
            )
        )

        return make_response(response, 200)

    def patch(self, id):
        order = get_order(id)
        if not order:
            return make_response({"error": msg.get("NO_ORDER")}, 404)

        if order.user_id != session.get("user_id"):
            return make_response({"error": msg.get("USER_ID_MISMATCH")}, 403)

        updates = request.json or {}
        if not updates:
            return make_response({"error": msg.get("NO_DATA")}, 400)

        action_type = request.args.get("action_type")
        if action_type == "checkout":
            if order.status != "open":
                return make_response({"error": msg.get("NOT_OPEN_ORDER")}, 400)

            if not len(order.order_products):
                return make_response({"error": msg.get("EMPTY_ORDER")}, 400)

            for op in order.order_products:
                op.price = op.product.price

            order.total = sum(op.price * op.quantity for op in order.order_products)
            order.product_count = sum(op.quantity for op in order.order_products)
            order.order_ts = datetime.now(timezone.utc)

        for k, v in updates.items():
            setattr(order, k, v)

        db.session.commit()

        return make_response(order.to_dict(), 200)

    def delete(self, id):
        order = get_order(id)
        if not order:
            return make_response({"error": msg.get("NO_ORDER")}, 404)

        if order.user_id != session.get("user_id"):
            return make_response({"error": msg.get("USER_ID_MISMATCH")}, 403)

        db.session.delete(order)
        db.session.commit()

        return make_response({"message": msg.get("REC_DELETED")}, 200)


api.add_resource(OrderById, "/orders/<int:id>")


class AllOrderProducts(Resource):
    def get(self):
        order_id = request.args.get("order_id")
        if not order_id:
            return make_response({"error": msg.get("NO_ORDER_ID")}, 400)

        order = get_order(order_id)

        if not order:
            return make_response({"error": msg.get("NO_ORDER")}, 404)

        if order.user_id != session.get("user_id"):
            return make_response({"error": msg.get("USER_ID_MISMATCH")}, 403)

        order_products = order.order_products

        serialized_order_products = [
            op.to_dict(
                rules=("-product", "product.name", "product.image_url", "product.price")
            )
            for op in order_products
        ]

        return make_response(serialized_order_products, 200)

    def post(self):
        fields = ["order_id", "product_id"]
        data = {k: request.json.get(k) for k in fields}

        if falsey := find_falsey(data):
            return make_response(
                {"error": msg.get("MISSING_FIELDS").format(fields="".join(falsey))},
                422,
            )

        order = get_order(data.get("order_id"))
        if order.user_id != session.get("user_id"):
            return make_response({"error": msg.get("UNAUTHORIZED")}, 403)

        product = get_product(data.get("product_id"))
        if not product:
            return {"error": msg.get("ID_NOT_FOUND")}, 404

        new_order_product = OrderProduct(**data)
        db.session.add(new_order_product)
        db.session.commit()

        return make_response(new_order_product.to_dict(), 201)


api.add_resource(AllOrderProducts, "/order_products")


class OrderProductById(Resource):
    def patch(self, id):
        order_product = get_order_prod(id)
        if not order_product:
            return make_response({"error": msg.get("ID_NOT_FOUND")}, 404)

        if order_product.order.user_id != session.get("user_id"):
            return make_response({"error": msg.get("UNAUTHORIZED")}, 403)

        updates = request.json or {}
        if not updates:
            return make_response({"error": msg.get("NO_DATA")}, 400)

        has_quantity = "quantity" in updates

        if has_quantity:
            try:
                new_quantity = int(updates.get("quantity"))
            except (TypeError, ValueError):
                return make_response({"error": msg.get("INVALID_QUANTITY")}, 400)
            if new_quantity < 0:
                return make_response({"error": msg.get("NEGATIVE_QUANTITY")}, 400)
            if len(updates) > 1:
                return make_response({"error": msg.get("INVALID_COMBO")}, 400)

        if has_quantity and new_quantity == 0:
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
            return make_response({"error": msg.get("ID_NOT_FOUND")}, 404)

        if order_product.order.user_id != session.get("user_id"):
            return make_response({"error": msg.get("USER_ID_MISMATCH")}, 403)

        db.session.delete(order_product)
        db.session.commit()

        return make_response({"message": msg.get("REC_DELETED")}, 200)


api.add_resource(OrderProductById, "/order_products/<int:id>")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
