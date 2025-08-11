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


if __name__ == '__main__':
    app.run(port=5555, debug=True)
