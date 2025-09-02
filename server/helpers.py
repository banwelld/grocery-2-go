# helpers.py

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
