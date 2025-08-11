#!/usr/bin/env python3

from random import randint, sample
from faker import Faker
from app import app
from models import db, User, Order, Item, OrderItem
from seed_items import seed_items

fake = Faker('en_CA')

def new_user():
    user = {}
    user['f_name'] = fake.first_name()
    user['l_name'] = fake.last_name()
    user_suffix = str(randint(1, 9999)).zfill(4)
    user_domain = fake.domain_name()
    user['email'] = f"{user['l_name'].lower()}{user['f_name'][0].lower()}{user_suffix}@{user_domain}"
    user_area_cd = f"{randint(2, 7)}{str(randint(1, 99)).zfill(3)}"
    user_prefix = f"{randint(2, 9)}{str(randint(1, 99)).zfill(3)}"
    user['phone_num'] = f"{user_area_cd}{user_prefix}{user_suffix}"
    user['password_hash'] = fake.password(
        length=40,
        special_chars=True,
        digits=True,
        upper_case=True,
        lower_case=True
    )
    return User(**user)


def new_order(user_id):
    province = fake.province_abbr()
    return Order(
        order_ts=fake.past_datetime(start_date='-60d'),
        address=fake.street_address(),
        city=fake.city(),
        province_cd=province,
        postal_cd=fake.postalcode_in_province(province_abbr=province),
        order_total=0,
        user_id=user_id
    )


def new_order_item(order_id, unit_price_paid, item_id):
    quantity = randint(1, 5)
    return OrderItem(
        quantity=quantity,
        unit_price_paid=unit_price_paid,
        item_id=item_id,
        order_id=order_id
    )


if __name__ == '__main__':
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
        items = [Item(**item_data) for item_data in seed_items]
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
                    order_id=order.id,
                    unit_price_paid=item.unit_price,
                    item_id=item.id
                )
                order_items.append(order_item)
                order.order_total += order_item.quantity * order_item.unit_price_paid

        db.session.add_all(order_items)

        print("Committing all data to db...\n")
        db.session.commit()
        print("Seeding done!\n")
