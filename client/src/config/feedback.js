const Modals = {
  CONFIRM_CANCEL: `Cancellation is permanent. Are you sure that you want to
  cancel your order?`,
  CONFIRM_CHECKOUT: `Click 'Place Order' to confirm order submission.`,
  CONFIRM_DELETE_ORDER: `Deletion is permanent. Are you sure that you want to
  delete your order?`,
  CONFIRM_DELETE_USER: `Deletion is permanent. Your account and all of your
  orders will be deleted. Are you sure that you want to delete your account?`,
  CONFIRM_LOGOUT: `Are you sure that you want to logout?`,
};

const Toasts = {
  CHECKOUT: {
    BUSY: `Checking out...`,
    FAILURE: `Checkout failed`,
    SUCCESS: `Checked out!`,
  },
  ORDER: {
    CANCEL: {
      BUSY: `Cancelling order...`,
      FAILURE: `Could not cancel order`,
      STATUS: `Must be 'submitted' to cancel`,
      SUCCESS: `Order cancelled`,
    },
    CREATE: {
      BUSY: `Creating new cart...`,
      FAILURE: `Could not create new cart`,
      GUEST: `Please login to load a cart`,
      SUCCESS: `New cart initiated`,
    },
    DELETE: {
      BUSY: `Deleting order...`,
      FAILURE: `Could not delete order`,
      STATUS: `Must be 'cancelled' to delete`,
      SUCCESS: `Order deleted`,
    },
    LOAD: {
      BUSY: `Loading order...`,
      FAILURE: `Could not load order`,
      SUCCESS: `Order loaded`,
    },
    SUBMIT: {
      BUSY: `Submitting order...`,
      FAILURE: `Could not submit order`,
      EMPTY_CART: `Cart is empty`,
      SUCCESS: `Order submitted`,
    },
  },
  ORDER_LIST: {
    LOAD: {
      BUSY: `Loading orders...`,
      FAILURE: `Could not load orders`,
      NO_ORDERS: `User has no orders`,
      SUCCESS: `User's orders loaded`,
    },
  },
  ORDER_PRODUCT: {
    CREATE: {
      BUSY: `Adding product...`,
      FAILURE: `Could not add product`,
      SUCCESS: `Product added to cart`,
    },
  },
  PRODUCTS: {
    LOAD: {
      BUSY: `Loading collection...`,
      FAILURE: `Could not load collection`,
      SUCCESS: `Collection loaded`,
    },
  },
  PRODUCT: {
    CREATE: {
      BUSY: 'Creating product...',
      FAILURE: 'Could not create product',
      SUCCESS: 'Product created!',
    },
    UPDATE: {
      BUSY: 'Updating product...',
      FAILURE: 'Could not update product',
      SUCCESS: 'Product updated!',
    },
  },
  USER: {
    DELETE: {
      BUSY: `Deleting user...`,
      FAILURE: `Could not delete user`,
      ORDERS_PENDING: `User has unfulfilled orders`,
      SUCCESS: `User deleted`,
    },
    LOGIN: {
      BAD_CREDS: `Invalid email or password`,
      BUSY: `Logging in...`,
      FAILURE: `Could not login.`,
      SUCCESS: `: Logged in!`,
    },
    LOGOUT: {
      BUSY: `Logging out...`,
      FAILURE: `Could not logout.`,
      SUCCESS: `Logged out`,
    },
    REGISTER: {
      BUSY: `Registering...`,
      FAILURE: `Could not register.`,
      SUCCESS: `: Registered!`,
      EMAIL_TAKEN: (email) => `${email}: is already in use.`,
    },
    UPDATE: {
      BUSY: `Updating...`,
      FAILURE: `Could not update.`,
      SUCCESS: `Update successful`,
    },
  },
};

const Errors = {
  FAILURE: {
    CREATE: `CRUD 'create' request failed.`,
    DELETE: `CRUD 'delete' request failed.`,
    RECEIVE: `CRUD 'receive' request failed.`,
    UPDATE: `CRUD 'update' request failed.`,
  },
  INVALID: {
    CREDENTIALS: `Email address or password were invalid.`,
    DATA: (expected, got) => `Invalid data: Expected '${expected}',
    got '${got}'.`,
    ID: (idType) => `ID (${idType}) not found.`,
    STATUS: (expected, got) => `Invalid status: Expected '${expected}',
    got '${got}'.`,
  },
  MISSING_CREDENTIALS: `Email address and/or password were missing.`,
};

const Feedback = {
  Errors,
  Modals,
  Toasts,
};

export default Feedback;
