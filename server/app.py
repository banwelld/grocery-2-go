#!/usr/bin/env python3

import json
from enum import Enum

from config import api, app, bcrypt, db
from flask import make_response, request, session
from flask_restful import Resource
from helpers import find_falsey, find_req_fields
from models import Item, Order, OrderItem, User

# get error messages from messages.json

with open("messages.json", "r") as m:
    msg = json.load(m)

# reusable dummy hash to balance timing of authentications where the
# user email is found with ones where it is not found

DUMMY_HASH = bcrypt.generate_password_hash("dummy123").decode("utf-8")

# serialize rules

ITEM_SER_FIELDS = (
    "id",
    "name",
    "origin",
    "description",
    "price",
    "category",
    "unit",
    "pkg_qty",
    "image_url",
)

# arg enums


class Action(Enum):
    CHECKOUT = "checkout"


class Status(Enum):
    OPEN = "open"


# authentication protection


class AuthResource(Resource):
    def dispatch_request(self, *args, **kwargs):
        if "user_id" not in session:
            return {"error": "Unauthorized"}, 401
        return super().dispatch_request(*args, **kwargs)

    @property
    def current_user(self):
        return User.query.get(session["user_id"])


# views


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


class AllUsers(Resource):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return make_response({"message": "User not authenticated"}, 401)

        user = User.query.get(user_id)
        if not user:
            return make_response({"message": msg["ID_NOT_FOUND"]}, 401)

        return user.to_dict(rules=("-_password_hash",)), 200

    def post(self):
        fields = find_req_fields(User)
        data = {k: request.json.get(k) for k in fields}

        if falsey := find_falsey(data):
            return make_response(
                {"error": msg["MISSING_FIELDS"].format(fields="".join(falsey))},
                422,
            )

        new_user = User(**data)
        db.session.add(new_user)
        db.session.commit()

        return make_response(new_user.to_dict(only=("role", "f_name")), 201)


api.add_resource(AllUsers, "/users")


class Session(Resource):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return make_response({"message": "User not authenticated"}, 401)

        user = User.query.get(user_id)
        if not user:
            return make_response({"message": msg["ID_NOT_FOUND"]}, 401)

        return user.to_dict(only=("role", "f_name")), 200

    def post(self):
        data = request.json or {}
        if not data:
            return make_response({"message": msg["NO_DATA"]}, 400)

        required = ["email", "password"]
        if falsey := find_falsey({k: data.get(k) for k in required}):
            return make_response(
                {"error": msg["MISSING_FIELDS"].format(fields="".join(falsey))},
                422,
            )

        user = User.query.filter(User.email == data["email"]).first()
        if not user:
            bcrypt.check_password_hash(DUMMY_HASH, data["password"])
            return make_response({"error": msg["INVALID_CREDS"]}, 401)

        if not user.authenticate(data["password"]):
            return make_response({"error": msg["INVALID_CREDS"]}, 401)

        session["user_id"] = user.id
        return user.to_dict(only=("role", "f_name")), 200

    def delete(self):
        session.pop("user_id", None)
        return make_response({"message": "Logged out"}, 200)


api.add_resource(Session, "/session")


class AllItems(Resource):
    def get(self):
        items = [i.to_dict(only=ITEM_SER_FIELDS) for i in Item.query.all()]
        return make_response(items, 200)

    def post(self):
        fields = find_req_fields(Item)
        data = {k: request.json.get(k) for k in fields}

        if falsey := find_falsey(data):
            return make_response(
                {"error": msg["MISSING_FIELDS"].format(fields="".join(falsey))},
                422,
            )

        new_item = Item(**data)
        db.session.add(new_item)
        db.session.commit()

        return make_response(new_item.to_dict(), 201)


api.add_resource(AllItems, "/items")


class ItemById(Resource):
    def get(self, id):
        item = Item.query.get(id)
        if not item:
            return make_response({"message": msg["ID_NOT_FOUND"]}, 404)

        return make_response(
            item.to_dict(only=ITEM_SER_FIELDS),
            200,
        )


api.add_resource(ItemById, "/items/<int:id>")


class AllOrders(Resource):
    def get(self):
        user_id = session["user_id"]
        if not user_id:
            return make_response({"error": msg["NOT_AUTH"]}, 401)

        status = request.args.get("status")

        query = Order.query.filter(Order.user_id == user_id)
        if status == "open":
            query = query.filter(Order.status == "open")

        user_orders = query.all()

        return make_response(
            [o.to_dict() for o in user_orders],
            200,
        )

    def post(self):
        user_id = request.json.get("user_id")

        if not user_id:
            return make_response(
                {"error": msg["MISSING_FIELDS"].format("user_id")},
                422,
            )

        new_order = Order(user_id=user_id)
        db.session.add(new_order)
        db.session.commit()

        return make_response(new_order.to_dict(), 201)


api.add_resource(AllOrders, "/orders")


class OrderById(Resource):
    def patch(self, id):
        order = Order.query.get(id)
        if not order:
            return make_response({"message": msg["NO_ORDER"]}, 404)

        updates = request.json or {}
        if not updates:
            return make_response({"message": msg["NO_DATA"]}, 400)

        action = request.args.get("action")
        if action == "checkout":
            if order.status != "open":
                return make_response({"message": msg["NOT_OPEN_ORDER"]}, 400)

            if not len(order.order_items):
                return make_response({"message": msg["ORDER_EMPTY"]}, 400)

            for oi in order.order_items:
                oi.price = oi.item.price

            order.total = sum(oi.price * oi.quantity for oi in order.order_items)

        for k, v in updates.items():
            setattr(order, k, v)

        db.session.commit()

        return make_response(order.to_dict(), 200)

    def delete(self, id):
        order = Order.query.get(id)
        if not order:
            return make_response({"message": msg["NO_ORDER"]}, 404)

        db.session.delete(order)
        db.session.commit()

        return make_response({"message": msg["REC_DELETED"]}, 200)


api.add_resource(OrderById, "/orders/<int:id>")


class AllOrderItems(Resource):
    def get(self):
        order_id = request.args.get("order_id")
        if not order_id:
            return make_response({"error": msg["NO_ORDER_ID"]}, 400)

        order_items = OrderItem.query.filter(OrderItem.order_id == order_id).all()

        serialized_items = [
            oi.to_dict(rules=("-item", "item.name", "item.image_url", "item.price"))
            for oi in order_items
        ]

        return make_response(serialized_items, 200)

    def post(self):
        fields = ["order_id", "item_id"]
        data = {k: request.json.get(k) for k in fields}

        if falsey := find_falsey(data):
            return make_response(
                {"error": msg["MISSING_FIELDS"].format(fields="".join(falsey))},
                422,
            )

        new_order_item = OrderItem(**data)
        db.session.add(new_order_item)
        db.session.commit()

        return make_response(new_order_item.to_dict(), 201)


api.add_resource(AllOrderItems, "/order_items")


class OrderItemById(Resource):
    def patch(self, id):
        order_item = OrderItem.query.get(id)
        if not order_item:
            return make_response({"message": msg["ID_NOT_FOUND"]}, 404)

        updates = request.json or {}
        if not updates:
            return make_response({"message": msg["NO_DATA"]}, 400)

        for k, v in updates.items():
            setattr(order_item, k, v)

        db.session.commit()

        return make_response(order_item.to_dict(), 200)

    def delete(self, id):
        order_item = OrderItem.query.get(id)
        if not order_item:
            return make_response({"message": msg["ID_NOT_FOUND"]}, 404)

        db.session.delete(order_item)
        db.session.commit()

        return make_response({"message": msg["REC_DELETED"]}, 200)


api.add_resource(OrderItemById, "/order_items/<int:id>")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
