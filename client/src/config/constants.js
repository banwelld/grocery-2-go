export const DataTypes = {
  FUNCTION: 'function',
  NUMBER: 'number',
  OBJECT: 'object',
  STRING: 'string',
};

export const Headings = {
  CART: `My Shopping Cart`,
  CART_EMPTY: `Empty Cart`,
  CART_LIST: `Cart Contents`,
  CART_PRODUCTS: `Product List`,
  CART_TOTALS: `Cart Totals`,
  CHECKOUT: `Checkout`,
  CHECKOUT_CONFIRM: `Order Submission`,
  CHECKOUT_CONFIRMATION: `Order Confirmation`,
  CHECKOUT_DELIVERY: `Delivery Address`,
  DATA_MISSING: 'Config Data Missing or Invalid',
  EDIT_PRODUCT: `Edit Product`,
  PRODUCT_CATALOG_HEAD: `Grocery2Go`,
  PRODUCT_CATALOG_SUBHEAD: `Home - Product Listing`,
  LOGIN: `Welcome Back`,
  MISSING_INVALID: 'Missing or Invalid Data',
  ORDER_CANCELLED: `Cancelled Order`,
  ORDER_DETAILS: `Order Details`,
  ORDER_FULFILLED: `Fulfilled Order`,
  ORDER_IN_PROGRESS: `In-Progress Order`,
  ORDER_LIST: `Product List`,
  ORDER_SUBMITTED: `Submitted Order`,
  ORDER_TOTALS: `Order Totals`,
  ORDER_UNKNOWN: `Order (unknown type)`,
  PRODUCT: `Product Details`,
  PRODUCT_SIDEBAR: `In Your Cart`,
  PRODUCT_UPDATE: 'Manage Product Details',
  PRODUCTS: `Our Products`,
  REALTIME_VIEW: 'View Updates',
  REGISTER: `Sign Up!`,
  WHOOPS: `Whoops!`,
  UPDATE_PASSWORD: `Update User Password`,
  UPDATE_USER_INFO: `Update Personal Information`,
  USER: `My Profile`,
  USER_INFO: `Personal Information`,
  USER_ORDERS: `Order History`,
};

export const UiText = {
  ALREADY_LOGGED_IN: [
    `It looks like you're already logged in. Please logout before trying
      to login or register.`,
  ],
  CART: [
    `Welcome to your cart. Hover over any row to reveal options. You can click
      on a product's name to visit its information page or use the quantity
      adjustment buttons to adjust product quantities remove all of a product
      at once with the trash button.`,
    `If you're ready to start the checkout process, click 'Checkout!' in
      the sidebar.`,
  ],
  CART_EMPTY: [
    `Your cart is empty. Click on the 'Home' link in the header to do some
      shopping`,
  ],
  CHECKOUT_CONFIRMATION: [
    `If the above information is correct, click the 'submit' button to complete
      your order. We will notify you via email of payment options.`,
  ],
  CHECKOUT_DELIVERY: [
    `Please enter tha delivery address for your order and click the 'Submit'
      button to save the address. Once the address is saved, click 'Next' to
      confirm to the order confirmation page.`,
  ],
  CHECKOUT: [
    `Please enter or confirm all needed information and click the 'next' button
      to confirm with checkout.`,
  ],
  INVALID_PRODUCT_ID: (id) => [
    `INVALID ID: We have no product in our collection with ID '${id}'.`,
  ],
  LOGIN: [
    `In order to provide you with products of the highest quality and at the
      best prices, we must have an active and engaged membership. As such,
      you'll need to login to the site to take advantage of Grocery2Go's
      benefits.`,
    `Not a member yet? We'd love to have you sign up!`,
  ],
  MISSING_CONFIG: [
    `Configuration file is missing or invalid. Cannot render page. If this
      persists, please contact suport.`,
  ],
  NOT_LOGGED_IN: [
    `You must be logged in to view this page. Please login or register to continue.`,
  ],
  ORDER: [
    `Here's your order! You can click on a product's name to visit its
    information page where you can add it to your current shopping cart.`,
  ],
  PREV_ORDERS: [
    `Here is a list of your previous orders. You can click on an order's date
    to view its product list and details, to cancel an unfulfilled order, or
    to delete a cancelled order.`,
  ],
  REGISTER: [
    `We're thrilled that you've decided to create an account! Just give us a
    little info about yourself and you'll be all ready to load up a shopping
    cart with gourmet ingredients and farm fresh meats and produce.`,
    `All fields are mandatory so be sure to complete the entire form. Your
    password must consist of at least 10 characters with a lowercase and
    uppercase character, a digit and a special character (e.g., !@#$%).`,
  ],
  USER: [
    `Welcome to your profile. Feel free to browse your personal information or
    your previous orders list.`,
    `If you notice that your information needs updating or would like to update
    your password, you'll find an update button in the sidebar. And, although
    we'd hate to see you close your account, we understand that people
    sometimes have to do that. You'll find that option in the sidebar, as
    well.`,
  ],
  USER_INFO_CONFIRM: [
    `By checking this box, I affirm that the above information is accurate
    and complete.`,
  ],
  WRONG_USER: [`You are not authorized to view this page.`],
};

export const InputTypes = Object.freeze({
  EMAIL: 'email',
  INPUT: 'input',
  NUMBER: 'number',
  PASSWORD: 'password',
  PHONE: 'tel',
  SELECT: 'select',
  TEXT: 'text',
  TEXTAREA: 'textarea',
});
