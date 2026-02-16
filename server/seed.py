#!/usr/bin/env python3

import json
from random import randint, sample

from app import app
from faker import Faker
from models import Order, OrderProduct, Product, User, db

# open up AI-generated product data

with open("seed_products.json", "r") as f:
    product_data = json.load(f)

fake = Faker("en_CA")


def new_user():
    user = {}
    user["name_first"] = fake.first_name()
    user["name_last"] = fake.last_name()
    user_suffix = str(randint(1, 9999)).zfill(4)
    user_domain = fake.domain_name()
    user["email"] = f"{user['name_last'].lower()}{user_suffix}@{user_domain}"
    user_area_code = f"{randint(2, 7)}{str(randint(1, 99)).zfill(2)}"
    user_prefix = f"{randint(2, 9)}{str(randint(1, 99)).zfill(2)}"
    user["phone"] = f"{user_area_code}{user_prefix}{user_suffix}"
    user["password"] = "This!23456"
    user["created_at"] = fake.date_time_between(
        start_date="-1y", end_date="-60d"
    )
    return User(**user)


def new_order(user_id, is_submitted):
    if not is_submitted:
        return Order(user_id=user_id)

    province = fake.province_abbr()
    return Order(
        created_at=fake.past_datetime(start_date="-30d"),
        address_line_1=fake.street_address(),
        city=fake.city(),
        province_code=province,
        postal_code=fake.postalcode_in_province(province_abbr=province),
        user_id=user_id,
        status="submitted",
    )


def new_order_product(order_id, product_id):
    return OrderProduct(
        quantity=randint(1, 3),
        product_id=product_id,
        order_id=order_id,
    )


def generate_product_list():
    products = []
    for product in product_data:
        data = product.copy()
        data["created_at"] = fake.date_time_between(
            start_date="-3y", end_date="-1y"
        )
        data["description"] = "\n\n".join(
            [
                fake.paragraph(nb_sentences=4),
                fake.paragraph(nb_sentences=2),
            ]
        )
        products.append(Product(**data))
    return products


if __name__ == "__main__":
    with app.app_context():
        print("\nStarting seed...\n")

        print("Deleting data...\n")
        OrderProduct.query.delete()
        Order.query.delete()
        Product.query.delete()
        User.query.delete()

        db.session.commit()

        print("Creating users...\n")
        users = [new_user() for _ in range(40)]

        db.session.add_all(users)
        db.session.flush()

        print("Creating products...\n")
        products = generate_product_list()

        db.session.add_all(products)

        print("Creating orders with products...\n")
        open_orders = [new_order(user.id, False) for user in sample(users, 10)]
        submitted_orders = [
            new_order(user.id, True) for user in sample(users, 10)
        ]

        all_orders = open_orders + submitted_orders

        db.session.add_all(all_orders)
        db.session.flush()

        order_products = [
            new_order_product(order.id, product.id)
            for order in all_orders
            for product in sample(products, randint(3, 15))
        ]

        db.session.add_all(order_products)
        db.session.flush()

        submitted_orders = Order.query.filter(Order.status == "submitted").all()

        for order in submitted_orders:
            order.final_total_cents = sum(
                product.quantity * product.product.price_cents
                for product in order.order_products
            )
            order.product_count = sum(
                product.quantity for product in order.order_products
            )

        print("Adding Dave Bawell with orders...\n")
        dave = User(
            email="dave@davebanwell.com",
            name_first="Dave",
            name_last="Banwell",
            phone=5195551212,
            password="This!23456",
        )

        dave2 = User(
            email="davidwbanwell@gmail.com",
            name_first="David",
            name_last="Banwell",
            phone=5195551212,
            role="admin",
            password="This!23456",
        )

        db.session.add(dave)
        db.session.add(dave2)
        db.session.flush()

        open_order = Order.query.filter(Order.status == "open").first()
        submitted_order = Order.query.filter(
            Order.status == "submitted"
        ).first()

        for order in (open_order, submitted_order):
            order.user_id = dave.id

        print("Committing all data to db...\n")
        db.session.commit()

        print("Seeding done!\n")
