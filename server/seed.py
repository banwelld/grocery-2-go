#!/usr/bin/env python3

import json
from random import randint, sample

from app import app
from faker import Faker
from models import Item, Order, OrderItem, User, db

# open up AI-generated item data

with open("seed_items.json", "r") as f:
    seed_item_data = json.load(f)

fake = Faker("en_CA")


def new_user():
    user = {}
    user["f_name"] = fake.first_name()
    user["l_name"] = fake.last_name()
    user_suffix = str(randint(1, 9999)).zfill(4)
    user_domain = fake.domain_name()
    user["email"] = (
        f"{user['l_name'].lower()}{user['f_name'][0].lower()}{user_suffix}@{user_domain}"
    )
    user_area_cd = f"{randint(2, 7)}{str(randint(1, 99)).zfill(2)}"
    user_prefix = f"{randint(2, 9)}{str(randint(1, 99)).zfill(2)}"
    user["phone"] = f"{user_area_cd}{user_prefix}{user_suffix}"
    user["password"] = "This!23456"
    return User(**user)


def new_order(user_id, is_submitted):
    if not is_submitted:
        return Order(user_id=user_id)

    province = fake.province_abbr()
    return Order(
        order_ts=fake.past_datetime(start_date="-30d"),
        address=fake.street_address(),
        city=fake.city(),
        province_cd=province,
        postal_cd=fake.postalcode_in_province(province_abbr=province),
        total=0,
        user_id=user_id,
        status="submitted",
    )


def new_order_item(order_id, item_id):
    return OrderItem(
        quantity=randint(1, 3),
        item_id=item_id,
        order_id=order_id,
    )


def generate_item_list():
    return [
        Item(
            **item_data,
            description=fake.paragraph(nb_sentences=4)
            + "\n\n"
            + fake.paragraph(nb_sentences=2),
        )
        for item_data in seed_item_data
    ]


if __name__ == "__main__":
    with app.app_context():
        print("\nStarting seed...\n")

        print("Deleting data...\n")
        OrderItem.query.delete()
        Order.query.delete()
        Item.query.delete()
        User.query.delete()

        db.session.commit()

        print("Creating users...\n")
        users = [new_user() for _ in range(40)]

        db.session.add_all(users)
        db.session.flush()

        print("Creating items...\n")
        items = generate_item_list()

        db.session.add_all(items)

        print("Creating orders with items...\n")
        open_orders = [new_order(user.id, False) for user in sample(users, 10)]
        submitted_orders = [new_order(user.id, True) for user in sample(users, 10)]

        all_orders = open_orders + submitted_orders

        db.session.add_all(all_orders)
        db.session.flush()

        order_items = [
            new_order_item(order.id, item.id)
            for order in all_orders
            for item in sample(items, randint(3, 15))
        ]

        db.session.add_all(order_items)
        db.session.flush

        print("Adding Dave Bawell with orders...\n")
        dave = User(
            email="dave@davebanwell.com",
            f_name="Dave",
            l_name="Banwell",
            phone=5195551212,
            password="This!23456",
        )

        db.session.add(dave)
        db.session.flush

        open_order = Order.query.filter(Order.status == "open").first()
        submitted_order = Order.query.filter(Order.status == "submitted").first()

        for order in (open_order, submitted_order):
            order.user_id = dave.id

        print("Committing all data to db...\n")
        db.session.commit()

        print("Seeding done!\n")
