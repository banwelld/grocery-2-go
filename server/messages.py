class MsgKey:
    ID_EMPTY = "ID_EMPTY"
    ID_NOT_FOUND = "ID_NOT_FOUND"
    INVALID_CREDS = "INVALID_CREDS"
    MISSING_FIELDS = "MISSING_FIELDS"
    NO_ORDER = "NO_ORDER"
    NO_DATA = "NO_DATA"
    NOT_AUTH = "NOT_AUTH"
    RECORD_DELETED = "RECORD_DELETED"
    NO_ORDER_ID = "NO_ORDER_ID"
    INVALID_STATUS = "INVALID_STATUS"
    EMPTY_ORDER = "EMPTY_ORDER"
    INVALID_QUANTITY = "INVALID_QUANTITY"
    INVALID_COMBINATION = "INVALID_COMBINATION"
    LOGGED_OUT = "LOGGED_OUT"
    UNAUTHORIZED = "UNAUTHORIZED"
    UNCLOSED_ORDER = "UNCLOSED_ORDER"
    EMAIL_TAKEN = "EMAIL_TAKEN"


MESSAGES = {
    MsgKey.ID_EMPTY: "invalid id: null",
    MsgKey.ID_NOT_FOUND: "invalid id: not found",
    MsgKey.INVALID_CREDS: "invalid email address or password",
    MsgKey.MISSING_FIELDS: "missing required field(s): {fields}",
    MsgKey.NO_ORDER: "no order matching criteria",
    MsgKey.NO_DATA: "no data was passed with the request",
    MsgKey.NOT_AUTH: "user not authenticated",
    MsgKey.RECORD_DELETED: "record was successfully deleted",
    MsgKey.NO_ORDER_ID: "no order id parameter passed with request",
    MsgKey.INVALID_STATUS: "invalid order status: expected '{expected}', got '{got}'",
    MsgKey.EMPTY_ORDER: "order has no products",
    MsgKey.INVALID_QUANTITY: "invalid quantity type: expected 'integer', got '{type}'",
    MsgKey.INVALID_COMBINATION: "invalid update: quantity updates must be submitted singly",
    MsgKey.LOGGED_OUT: "logged out",
    MsgKey.UNAUTHORIZED: "Unauthorized",
    MsgKey.UNCLOSED_ORDER: "Invalid Deletion: User has unfulfilled orders",
    MsgKey.EMAIL_TAKEN: "email address is already in use",
}
