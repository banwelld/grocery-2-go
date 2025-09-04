#!/usr/bin/env python3

import json

from config import api, app, bcrypt, db
from flask import make_response, request, session
from flask_restful import Resource
from helpers import find_falsey, find_req_fields
from models import Item, Order, User
from sqlalchemy import and_

# get error messages from messages.json

with open("messages.json", "r") as m:
    msg = json.load(m)

# reusable dummy hash to balance timing of authentications where the
# user email is found with ones where it is not found

DUMMY_HASH = bcrypt.generate_password_hash("dummy123").decode("utf-8")


# views


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


class Login(Resource):
    def post(self):
        fields = ["email", "password"]
        data = {k: request.json.get(k) for k in fields}

        if falsey_keys := find_falsey(data):
            return make_response(
                {"error": msg["MISSING_FIELDS"].format(fields="".join(falsey_keys))},
                422,
            )

        user = User.query.filter(User.email == data["email"]).first()

        if not user:
            bcrypt.check_password_hash(DUMMY_HASH, data["password"])
            return make_response({"error": msg["INVALID_CREDS"]}, 401)

        if not user.authenticate(data["password"]):
            return make_response({"error": msg["INVALID_CREDS"]}, 401)

        session["user_id"] = user.id

        return make_response(user.to_dict(only=("role", "f_name")), 200)


api.add_resource(Login, "/login")


class Register(Resource):
    def post(self):
        fields = find_req_fields(User)
        data = {k: request.json.get(k) for k in fields}

        if falsey_keys := find_falsey(data):
            return make_response(
                {"error": msg["MISSING_FIELDS"].format(fields="".join(falsey_keys))},
                422,
            )

        new_user = User(**data)
        db.session.add(new_user)
        db.session.commit()

        return make_response(new_user.to_dict(only=("role", "f_name")), 201)


api.add_resource(Register, "/register")


class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get("user_id")).first()

        if user:
            return user.to_dict(only=("role", "f_name"))
        else:
            return make_response({"message": "User not logged in"}, 401)


api.add_resource(CheckSession, "/check_session")


class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return make_response({"message": "No Content"}, 204)


api.add_resource(Logout, "/logout")


class AllItems(Resource):
    def get(self):
        items = [i.to_dict(rules=("-order_items", "-orders")) for i in Item.query.all()]
        return make_response(items, 200)


api.add_resource(AllItems, "/items")


class ItemById(Resource):
    def get(self, id):
        item = Item.query.filter(Item.id == id).first()

        if not item:
            return make_response({"error": msg["ID_NOT_FOUND"]}, 404)

        return make_response(item.to_dict(rules=("-order_items", "-orders")), 200)


api.add_resource(ItemById, "/items/<int:id>")


class GetOpenOrder(Resource):
    def get(self):
        user_id = session["user_id"]
        order = Order.query.filter(
            and_(Order.user_id == user_id, Order.status == "open")
        ).first()

        if not order:
            return make_response({"error": msg["NO_ORDER"]}, 404)

        return make_response(
            order.to_dict(
                only=(
                    "id",
                    "order_items.item_id",
                    "order_items.price",
                    "order_items.quantity",
                )
            ),
            200,
        )


api.add_resource(GetOpenOrder, "/orders")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
