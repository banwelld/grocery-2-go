#!/usr/bin/env python3

import messages as msg
from config import api, app, db
from flask import make_response, request
from flask_restful import Resource
from models import Item

# views


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


class AllItems(Resource):
    def get(self):
        items = [i.to_dict(rules=("-order_items",)) for i in Item.query.all()]
        return make_response(items, 200)

    def post(self):
        item_name = request.json.get("name")
        item_category = request.json.get("category")
        item_origin = request.json.get("origin")
        item_description = request.json.get("description")
        item_unit_price = request.json.get("unit_price")
        item_unit = request.json.get("unit")
        item_image_url = request.json.get("image_url")

        new_item = Item(
            name=item_name,
            category=item_category,
            origin=item_origin,
            description=item_description,
            unit_price=item_unit_price,
            unit=item_unit,
            image_url=item_image_url,
        )

        db.session.add(new_item)
        db.session.commit()

        return make_response(new_item.to_dict(), 201)


api.add_resource(AllItems, "/items")


class ItemById(Resource):
    def get(self, id):
        item = Item.query.filter(Item.id == id).first()

        if not item:
            return make_response(msg.ID_NOT_FOUND, 404)

        return make_response(item.to_dict(), 200)

    def patch(self, id):
        item = Item.query.filter(Item.id == id).first()

        if not item:
            return make_response(msg.ID_NOT_FOUND, 404)

        for attr, value in request.json.items():
            setattr(item, attr, value)

        db.session.add(item)
        db.session.commit()

        return make_response(item.to_dict(), 200)

    def delete(self, id):
        item = Item.query.filter(Item.id == id).first()

        if not item:
            return make_response(msg.ID_NOT_FOUND, 404)

        db.session.delete(item)
        db.session.commit()

        return make_response({}, 204)


api.add_resource(ItemById, "/items/<int:id>")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
