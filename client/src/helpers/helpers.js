// client/srd/helpers/helpers.js

import clsx from "clsx";

const INVALID = "INVALID DATA RECEIVED";

// site-wide helper functions

export const isPlainObject = (v) => v?.constructor === Object;

export const fetchJson = (path, options = {}, camelize = true) =>
  fetch(path, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    ...options,
  }).then((res) =>
    res.json().then((data) => {
      if (!res.ok) throw new Error(`Error (${options.method || "GET"}): ${data.error}`);
      return camelize ? toCamelCase(data) : data;
    })
  );

export const getData = (path) => fetchJson(path);
export const deleteData = (path) => fetchJson(path, { method: "DELETE" });
export const postData = (path, body) =>
  fetchJson(path, { method: "POST", body: JSON.stringify(body) });
export const patchData = (path, body) =>
  fetchJson(path, { method: "PATCH", body: JSON.stringify(body) });

export const completeLogin = ({ setUser, data, onGetOrders }) => {
  setUser(data);
  return getData("/orders?status=open")
    .then((data) => onGetOrders(data))
    .catch((err) => console.error("Fetch basket failed:", err));
};

export const toTitleCase = (string) => {
  return string
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const paragraphsFromArray = (array) => {
  const isValid =
    Array.isArray(array) && array.length > 0 && array.every((i) => typeof i === "string");

  if (!isValid) {
    console.error(
      "paragraphsFromArray function received invalid data. Expected array of strings."
    );
    return <p>{INVALID}</p>;
  }

  return array.map((line, i) => <p key={i}>{line}</p>);
};

export const formatPhoneString = (phoneNum) => {
  if (typeof phoneNum !== "string" || phoneNum.length !== 10) return "Unknown";
  return `(${phoneNum.slice(0, 3)}) ${phoneNum.slice(3, -4)} - ${phoneNum.slice(-4)}`;
};

export const tsToDate = (tsField) => tsField.slice(0, 10);

export const autoPlural = (noun, quantity, withQuantity = true) => {
  if (!(typeof noun === "string")) return noun;
  const nounAgrees = quantity === 1 ? noun : `${noun}s`;
  return withQuantity ? `${quantity} ${nounAgrees}` : nounAgrees;
};

export function isValidTableConfig(tableConfig) {
  const { columnConfig } = tableConfig;
  if (!Array.isArray(columnConfig) || columnConfig.length === 0) {
    return false;
  }

  for (const col of columnConfig) {
    const { headerColSpan } = col;
    if (!Number.isInteger(headerColSpan) || headerColSpan < 0) {
      return false;
    }
  }

  const spanSum = columnConfig.reduce((sum, col) => sum + col.headerColSpan, 0);

  return spanSum === columnConfig.length;
}

export const validateOrders = (orders) => {
  if (!Array.isArray(orders)) {
    console.error("Expected 'orders' to be array and got wrong type.");
    return null;
  }

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

export const isInteger = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === "number") return Number.isInteger(value);
  if (typeof value === "string") return /^-?\d+$/.test(value.trim());
  return false;
};

export const compareSortValues = ({
  key = null,
  type = "string",
  direction = "asc",
} = {}) => {
  const validTypes = new Set(["string", "number"]);

  if (!validTypes.has(type)) {
    console.warn(`compareKeyValues: invalid type "${type}"`);
    return () => 0;
  }

  return (a, b) => {
    const valA = key ? a[key] : a;
    const valB = key ? b[key] : b;

    let result;

    switch (type) {
      case "string":
        result = String(valA).localeCompare(String(valB));
        break;
      case "number":
        result = Number(valA) - Number(valB);
        break;
    }

    const orient = (result) => (direction === "asc" ? result : -result);

    return orient(result);
  };
};

export const addUpdateAttr = (objectArr, attrib, valueOrFn) => {
  return objectArr.map((i) => ({
    ...i,
    [attrib]: typeof valueOrFn === "function" ? valueOrFn(i) : valueOrFn,
  }));
};

export const isValidString = (value) => {
  return typeof value === "string" && value.trim().length > 0;
};

export const isRenderable = (value) => isValidString(value) || isInteger(value);

export const intToDecimalPrice = (priceInt, isCurrency = true) => {
  const decimalPrice = (priceInt / 100).toFixed(2);
  return isCurrency ? `$ ${decimalPrice}` : `${decimalPrice}`;
};

export const tallyOrder = (orderProducts) =>
  orderProducts?.reduce((total, op) => total + op.quantity, 0) ?? 0;

export const getOrderTotal = (orderProducts) =>
  orderProducts?.reduce((total, op) => total + op?.quantity * op?.product?.price, 0) ?? 0;

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

export const toClassName = ({
  bemBlock = "invalid-missing-block",
  bemElem = null,
  bemMod = null,
  conditionalMod = null,
  showConditional = false,
} = {}) => {
  const isNonEmpty = (param) => typeof param === "string" && param.length > 0;

  const hasValidBlock = isNonEmpty(bemBlock) && bemBlock !== "invalid-missing-block";
  if (!hasValidBlock) {
    console.warn("'bemBlock' argument missing or invalid");
    return bemBlock;
  }

  const baseClass = isNonEmpty(bemElem) ? `${bemBlock}__${bemElem}` : `${bemBlock}`;

  return clsx(baseClass, {
    [`${baseClass}--${bemMod}`]: isNonEmpty(bemMod),
    [`${baseClass}--${conditionalMod}`]: isNonEmpty(conditionalMod) && showConditional,
  });
};

export const logException = (message, err) => {
  console.warn(message);
  console.error(err);
};
