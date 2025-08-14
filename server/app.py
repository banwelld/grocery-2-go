#!/usr/bin/env python3

# library imports

from flask import Flask, request, make_response
from flask_restful import Resource, Api
from flask_migrate import Migrate
import os

from config import app, db, api
from models import User, Item, Order, OrderItem


# views

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


class AllItems(Resource):
    
    def get(self):
        items = [i.to_dict(rules=("-order_items",)) for i in Item.query.all()]
        return make_response(items, 200)
    
api.add_resource(AllItems, "/items")


if __name__ == '__main__':
    app.run(port=5555, debug=True)
