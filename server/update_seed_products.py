#!/usr/bin/env python3

import json


def get_filename_from_product(product, id):
    split_url = product["image_filename"].split(".")
    image_extension = split_url[-1].lower()

    return f"{product['category'].lower()}{id:04}.{image_extension}"


def generate_updated_product_list(products):
    return [
        {
            **product,
            "image_filename": get_filename_from_product(product, index + 1),
        }
        for index, product in enumerate(products)
    ]


if __name__ == "__main__":
    with open("seed_products.json", "r") as f:
        product_data = json.load(f)

    updated_products = generate_updated_product_list(product_data)

    with open("seed_products.json", "w") as f:
        json.dump(updated_products, f, indent=2)
