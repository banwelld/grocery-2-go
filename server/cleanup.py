#!/usr/bin/env python3

from app import app
from models import Product, db


def get_image_name(product):
    split_url = product.image_filename.split(".")
    image_extension = split_url[-1].lower()

    return f"{product.category.lower()}{product.id:04}.{image_extension}"


def cleanup():
    products = Product.query.all()

    for product in products:
        image_name = get_image_name(product)
        product.image_filename = image_name

        db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        cleanup()
