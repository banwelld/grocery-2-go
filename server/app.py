#!/usr/bin/env python3

import json

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

# serialize fields for order responses

ORDER_RESP_FIELDS = (
    "id",
    "user_id",
    "order_items.item_id",
    "order_items.quantity",
)

# views


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


class AllUsers(Resource):
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
            return make_response({"message": "User not logged in"}, 401)

        user = User.query.get(user_id)
        if not user:
            return make_response({"message": "User not found"}, 404)

        return user.to_dict(only=("role", "f_name")), 200

    def post(self):
        data = request.json or {}
        if not data:
            return make_response({"message": msg["NO_DATA"]}, 404)

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
        items = [i.to_dict() for i in Item.query.all()]
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
        db.commit()

        return make_response(new_item.to_dict(), 201)


api.add_resource(AllItems, "/items")


class ItemById(Resource):
    def get(self, id):
        item = Item.query.get(id)
        if not item:
            return make_response({"error": msg["ID_NOT_FOUND"]}, 404)

        return make_response(item.to_dict(), 200)


api.add_resource(ItemById, "/items/<int:id>")


class AllOrders(Resource):
    def get(self):
        user_id = session["user_id"]
        if not user_id:
            return make_response({"error": msg["NOT_AUTH"]}, 401)

        status = request.args.get("status")

        user_orders = Order.query.filter(Order.user_id == user_id)
        if status == "open":
            user_orders = user_orders.filter(Order.status == "open")

        user_orders = user_orders.all()
        if not user_orders:
            return make_response({"message": msg["NO_ORDER"]}, 404)

        return make_response(
            [o.to_dict(only=ORDER_RESP_FIELDS) for o in user_orders], 200
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

        return make_response(new_order.to_dict(only=ORDER_RESP_FIELDS))


api.add_resource(AllOrders, "/orders")


class OrderById(Resource):
    def patch(self, id):
        order = Order.query.get(id)
        if not order:
            return make_response({"message": msg["NO_ORDER"]}, 404)

        updates = request.json or {}
        if not updates:
            return make_response({"message": msg["NO_DATA"]}, 400)

        for k, v in updates.items():
            setattr(order, k, v)

        db.session.commit()

        return make_response(order.to_dict(only=ORDER_RESP_FIELDS))

    def delete(self, id):
        order = Order.query.get(id)
        if not order:
            return make_response({"message": msg["NO_ORDER"]}, 404)

        db.session.delete(order)
        db.session.commit()

        return make_response({"message": msg["DEL_SUCCESS"]}, 200)


api.add_resource(OrderById, "/orders/<int:id>")


class AllOrderItems(Resource):
    def get(self):
        order_id = request.args.get("order_id")

        query = OrderItem.query
        if order_id:
            query = query.filter(OrderItem.order_id == order_id)

        order_items = query.all()

        return make_response([oi.to_dict(rules=()) for oi in order_items], 200)

    def post(self):
        print()


api.add_resource(AllOrderItems, "/order_items")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
