#!/usr/bin/env python3

import json

from config import api, app, bcrypt, db
from flask import make_response, request, session
from flask_restful import Resource
from helpers import find_falsey, find_req_fields
from models import Item, User

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

        return make_response(user.to_dict(only=("id", "role", "f_name")), 200)


api.add_resource(Login, "/login")


class AllUsers(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return make_response(users, 200)

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

        return make_response(new_user.to_dict(), 201)


api.add_resource(AllUsers, "/users")


class AllItems(Resource):
    def get(self):
        items = [i.to_dict(rules=("-order_items", "-orders")) for i in Item.query.all()]
        return make_response(items, 200)

    def post(self):
        fields = find_req_fields(User)
        data = {k: request.json.get(k) for k in fields}

        if falsey_keys := find_falsey(data):
            return make_response(
                {"error": msg["MISSING_FIELDS"].format(fields="".join(falsey_keys))},
                422,
            )

        new_item = Item(**data)
        db.session.add(new_item)
        db.session.commit()

        return make_response(new_item.to_dict(), 201)


api.add_resource(AllItems, "/items")


class ItemById(Resource):
    def get(self, id):
        item = Item.query.filter(Item.id == id).first()

        if not item:
            return make_response({"error": msg["ID_NOT_FOUND"]}, 404)

        return make_response(item.to_dict(), 200)

    def patch(self, id):
        item = Item.query.filter(Item.id == id).first()

        if not item:
            return make_response({"error": msg["ID_NOT_FOUND"]}, 404)

        for attr, value in request.json.items():
            setattr(item, attr, value)

        db.session.add(item)
        db.session.commit()

        return make_response(item.to_dict(), 200)

    def delete(self, id):
        item = Item.query.filter(Item.id == id).first()

        if not item:
            return make_response({"error": msg["ID_NOT_FOUND"]}, 404)

        db.session.delete(item)
        db.session.commit()

        return make_response({}, 204)


api.add_resource(ItemById, "/items/<int:id>")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
