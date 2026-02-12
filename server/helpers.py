from flask import make_response
from messages import MESSAGES
from sqlalchemy import inspect


def find_req_fields(model):
    """
    find fields that are non-nullable and that are also not any of: primary key,
    default, server_default. data from find_falsey() will be compared against the
    results to determine if all mandatory data has been passed.
    """
    mapper = inspect(model)
    required = [
        "password" if column.name == "_password_hash" else column.name
        for column in mapper.columns
        if (
            not column.nullable
            and not column.primary_key
            and column.default is None
            and column.server_default is None
        )
    ]
    return required


def find_falsey(dict):
    """
    find fields that have falsey values. data will be compared against get_req_fields()
    data to determine if all mandatory data has been passed.
    """
    falsey_keys = [k for k, v in dict.items() if not v]
    return (", ").join(falsey_keys)


def make_error(message_key, status=400, **kwargs):
    if message_key not in MESSAGES:
        raise ValueError(
            f"Message Key '{message_key}' not found in messages.json"
        )

    message_template = MESSAGES[message_key]
    message_text = (
        message_template.format(**kwargs) if kwargs else message_template
    )

    return make_response({"error": message_text}, status)


def make_message(message_key, status=200):
    if message_key not in MESSAGES:
        raise ValueError(
            f"Message Key '{message_key}' not found in messages.py"
        )

    return make_response({"message": MESSAGES[message_key]}, status)
