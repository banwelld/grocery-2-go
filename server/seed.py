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
    user_area_cd = f"{randint(2, 7)}{str(randint(1, 99)).zfill(3)}"
    user_prefix = f"{randint(2, 9)}{str(randint(1, 99)).zfill(3)}"
    user["phone"] = f"{user_area_cd}{user_prefix}{user_suffix}"
    user["password_hash"] = f"{user['l_name']}{user['f_name']}01"
    return User(**user)


def new_order(user_id):
    province = fake.province_abbr()
    return Order(
        order_ts=fake.past_datetime(start_date="-60d"),
        address=fake.street_address(),
        city=fake.city(),
        province_cd=province,
        postal_cd=fake.postalcode_in_province(province_abbr=province),
        total=0,
        user_id=user_id,
    )


def new_order_item(order_id, price, item_id):
    quantity = randint(1, 5)
    return OrderItem(
        quantity=quantity,
        price=price,
        item_id=item_id,
        order_id=order_id,
    )


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
        items = [Item(**item_data) for item_data in seed_item_data]

        for item in items:
            item.description = (
                fake.paragraph(nb_sentences=4) + "\n\n" + fake.paragraph(nb_sentences=2)
            )

        db.session.add_all(items)

        print("Creating orders...\n")
        orders = [new_order(user.id) for user in sample(users, 10)]
        db.session.add_all(orders)
        db.session.flush()

        print("Creating order_items and updating totals...\n")
        order_items = []

        for order in orders:
            for item in sample(items, 5):
                order_item = new_order_item(
                    order_id=order.id, price=item.price, item_id=item.id
                )
                order_items.append(order_item)
                order.total += order_item.quantity * order_item.price

        db.session.add_all(order_items)

        print("Committing all data to db...\n")
        db.session.commit()
        print("Seeding done!\n")
