// client/srd/helpers/helpers.js

import clsx from "clsx";

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

export const toTitleCase = (string) => {
  return string
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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

export const validateOrders = (orders) => {
  if (!Array.isArray(orders)) {
    console.warn("Expected 'orders' to be an array.", orders);
    return null;
  }

  const openOrders = orders.filter((o) => o.status === "open");

  if (openOrders.length === 0) return null;
  if (openOrders.length === 1) return openOrders[0];

  console.warn("The cart response contained more than one open order.", openOrders);

  const mostRecent = openOrders.reduce((latest, current) => {
    return new Date(current.statusTs) > new Date(latest.statusTs) ? current : latest;
  });

  console.warn(
    "Invariant violated: multiple open orders detected. Falling back to most recent open order.",
    mostRecent
  );

  return mostRecent;
};

export const isInteger = ({value, positiveOnly = false, min1 = false}) => {  
  if (value === null || value === undefined) return false;
  
  const base = min1 ? 1 : 0;

  if (typeof value === "number") return Number.isInteger(value) && (!positiveOnly || value >= base);

  if (typeof value === "string") {
    const trimmed = value.trim();
    
    if (trimmed.length === 0) return false;

    const num = Number(trimmed);
    return Number.isInteger(num) && (!positiveOnly || num >= base);
  }
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

    const result = {
      string: String(valA).localeCompare(String(valB)),
      number: Number(valA) - Number(valB),
    };

    const orient = (result) => (direction === "asc" ? result : -result);

    return orient(result[type]);
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

export const isRenderable = (value) => isValidString(value) || isInteger({value});

export const divideIntBy100 = (priceInt) => {
  if (isInteger({value: priceInt, positiveOnly: true})) return (priceInt / 100).toFixed(2);
  console.warn(`divideIntBy100: invalid price integer ${priceInt} (${typeof priceInt})`);
  return "??";
}

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

export const isNonEmpty = (string) => typeof string === "string" && string.length > 0;

export const toClassName = ({
  bemBlock = "invalid-missing-block",
  bemElem = null,
  bemMod = null,
  bemMod2 = null,
  showMod2 = false,
} = {}) => {
  const validBlock = isNonEmpty(bemBlock) && bemBlock !== "invalid-missing-block";
  const validElem = !!bemElem && isNonEmpty(bemElem);
  const validMod = !!bemMod && isNonEmpty(bemMod);
  const validMod2 = !!bemMod2 && isNonEmpty(bemMod2);

  if (!validBlock && (validElem || validMod || validMod2)) {
    console.warn("'bemBlock' argument missing or invalid");
    return bemBlock;
  }

  const baseClass = validElem ? `${bemBlock}__${bemElem}` : `${bemBlock}`;

  return clsx(baseClass, {
    [`${baseClass}--${bemMod}`]: validMod,
    [`${baseClass}--${bemMod2}`]: validMod2 && showMod2,
  });
};

export const buildBemProps = ({ bemBlock, bemElem, bemMod }) => ({ bemBlock, bemElem, bemMod });

export const logException = (message, err) => {
  console.warn(message);
  console.error(err);
};

export const runExclusive = ({fn, lockRef, setPending, setIsLoaded}) => {
  if (lockRef.current) return;

  lockRef.current = true;
  setPending(true);

  return fn().finally(() => {
    lockRef.current = false;
    setPending(false);
    if (typeof setIsLoaded === "function") setIsLoaded(true);
  });
};
