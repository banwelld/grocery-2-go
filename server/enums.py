from enum import Enum


class Status(str, Enum):
    OPEN = "open"
    CANCELLED = "cancelled"
    SUBMITTED = "submitted"
    IN_PROCESS = "in_process"
    NON_OPEN = "non_open"


class ActionType:
    CHECKOUT = "checkout"
    REGISTER = "register"


class FieldNames:
    PASSWORD = "password"
    PASSWORD_CURRENT = "password_current"
    EMAIL = "email"
    USER_ID = "user_id"
    STATUS = "status"
    SCOPE = "scope"
    ACTION_TYPE = "action_type"
    ORDER_ID = "order_id"
    PRODUCT_ID = "product_id"
    QUANTITY = "quantity"
