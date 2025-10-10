// helpers.js

export const getData = (path, onFetch, ...args) => {
  fetch(path)
    .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
    .then(({ ok, data }) => {
      if (ok) {
        onFetch(toCamelCase(data), ...args);
      } else {
        console.log(`Error (get): ${data.error}`);
      }
    });
};

const setData = (path, method, data, onSet, ...args) => {
  fetch(path, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
    .then(({ ok, data }) => {
      if (ok) {
        onSet(toCamelCase(data), ...args);
      } else {
        console.log(`Error (post/patch): ${data.error}`);
      }
    });
};

export const deleteData = (path, onDelete) => {
  fetch(path, {
    method: "DELETE",
  })
    .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
    .then(({ ok, data }) => {
      if (ok) {
        onDelete();
      } else {
        console.log(`Error (delete): ${data.error}`);
      }
    });
};

export const toTitleCase = (string) => {
  return string
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const toParagraphs = (textArr) =>
  textArr.map((line, index) => <p key={index}>{line}</p>);

export const formatPhoneString = (phoneNum) => {
  if (typeof phoneNum !== "string" || phoneNum.length !== 10) return "Unknown";
  return `(${phoneNum.slice(0, 3)}) ${phoneNum.slice(3, -4)} - ${phoneNum.slice(-4)}`;
};

export const getOrderDate = (tsField) => tsField.slice(0, 10);

export const autoPlural = (noun, quantity, withQuantity = true) => {
  if (!(typeof noun === "string")) return noun;
  const nounAgrees = quantity === 1 ? noun : `${noun}s`;
  return withQuantity ? `${quantity} ${nounAgrees}` : nounAgrees;
};

export const validateOrders = (orders, isCart) => {
  if (!Array.isArray(orders)) {
    console.error("Expected 'orders' to be array and got wrong type.");
    return null;
  }

  if (!isCart) return orders;

  const orderCount = orders.length;
  const openOrders = orders.filter((o) => o.status === "open");
  const openOrderCount = openOrders.length;

  if (orderCount === 0) return null;
  if (orderCount === 1 && orders[0].status === "open") return orders[0];

  console.error("The basket-load API response contained more than one order.", orders);

  if (openOrderCount === 0) {
    console.log("No open order in API response");
    return null;
  }

  if (openOrderCount === 1) {
    console.log("Using the single open order found in API response.");
    return openOrders[0];
  }

  const latestOrder = getLatestOrder(openOrders);
  console.log(
    "Multiple open orders found in API response. Using most recent (greatest ID number)."
  );
  return latestOrder;
};

function getLatestOrder(orders, dateField = "statusTs") {
  if (!orders || orders.length === 0) return null;

  return orders.reduce((latest, current) => {
    const latestTime = new Date(latest[dateField]).getTime();
    const currentTime = new Date(current[dateField]).getTime();

    return currentTime > latestTime ? current : latest;
  });
}

export const postData = (path, data, onPost, ...args) =>
  setData(path, "POST", data, onPost, ...args);

export const patchData = (path, data, onPatch, ...args) => {
  setData(path, "PATCH", data, onPatch, ...args);
};

export const sortBy = (array, key) => {
  const keyFn = typeof key === "function" ? key : (item) => item[key];
  return [...array].sort((a, b) => keyFn(a).localeCompare(keyFn(b)));
};

export const addUpdateAttr = (objectArr, attrib, valueOrFn) => {
  return objectArr.map((i) => ({
    ...i,
    [attrib]: typeof valueOrFn === "function" ? valueOrFn(i) : valueOrFn,
  }));
};

export const toDecimal = (amtInt) => (amtInt / 100).toFixed(2);

export const tallyOrder = (orderProducts) =>
  orderProducts?.reduce((total, orderProduct) => total + orderProduct.quantity, 0) ?? 0;

export const getOrderTotal = (orderProducts) =>
  orderProducts?.reduce(
    (total, orderProduct) =>
      total + orderProduct?.quantity * orderProduct?.product?.price,
    0
  ) ?? 0;

export function toCamelCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  } else if (obj !== null && obj.constructor === Object) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.replace(/_([a-z])/g, (_, char) => char.toUpperCase()),
        toCamelCase(value),
      ])
    );
  }
  return obj;
}

export function userToTableData(user) {
  const { fName, lName, email, phone, registrationTs } = user;
  return {
    name: ["Customer", `${fName} ${lName}`],
    phone: ["Phone", formatPhoneString(phone)],
    email: ["Email", email],
    regDt: ["Joined on", registrationTs.slice(0, 10)],
  };
}

export function orderToTableData(order) {
  const { productCount, user } = order;
  const { fName, lName, email, phone } = user;

  return {
    name: ["Customer", `${fName} ${lName}`],
    phone: ["Phone", formatPhoneString(phone)],
    email: ["Email", email],
    address: [
      "Deliver To",
      toParagraphs([
        order.address,
        `${order.city}, ${order.provinceCd}  ${order.postalCd}`,
      ]),
    ],
    orderdt: ["Order Dt", getOrderDate(order.orderTs)],
    statusdt: [`${toTitleCase(order.status)} Dt`, getOrderDate(order.statusTs)],
    productCount: ["Items", productCount],
    total: ["Total", `$ ${toDecimal(order.total)}`],
  };
}
