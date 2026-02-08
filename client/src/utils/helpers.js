import { DataTypes } from '../config/constants';
import Feedback from '../config/feedback';
import clsx from 'clsx';

const { Errors } = Feedback;

// private helpers

function toCamelCase(obj) {
  if (Array.isArray(obj)) return obj.map(toCamelCase);
  if (obj !== null && obj.constructor === Object) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        const newKey = key.replace(/_([a-z])/g, (_, char) =>
          char.toUpperCase(),
        );
        return [newKey, toCamelCase(value)];
      }),
    );
  }
  return obj;
}

// api calls and helpers

export const isValidString = (string) =>
  typeof string === DataTypes.STRING && string.trim().length > 0;

export const fetchJson = (path, options = {}, camelize = true) =>
  fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    ...options,
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) {
      const error = new Error(
        `Error (${options.method || 'GET'}): ${data.error || res.statusText}`,
      );
      error.status = res.status;
      throw error;
    }
    return data;
  });

export const getData = (path) => fetchJson(path);

export const deleteData = (path) => fetchJson(path, { method: 'DELETE' });

export const postData = (path, body) =>
  fetchJson(path, { method: 'POST', body: JSON.stringify(body) });

export const patchData = (path, body) =>
  fetchJson(path, { method: 'PATCH', body: JSON.stringify(body) });

export const runExclusive = ({ doFetch, lockRef, setPending, setIsLoaded }) => {
  if (lockRef.current) return;

  lockRef.current = true;
  setPending(true);

  return doFetch().finally(() => {
    lockRef.current = false;
    setPending(false);
    if (typeof setIsLoaded === DataTypes.FUNCTION) setIsLoaded(true);
  });
};

// formatting and normalizing

export const toPhoneNumFormat = (phoneString) => {
  const areaCode = phoneString.slice(0, 3);
  const exchange = phoneString.slice(3, -4);
  const subscriber = phoneString.slice(-4);

  if (typeof phoneString === DataTypes.STRING && phoneString.length === 10) {
    return `(${areaCode}) ${exchange} - ${subscriber}`;
  }

  return '** Missing/Invalid Phone Number **';
};

export const toDateIso = (dateString) => {
  const datePattern = /^\d{4}[-,/]\d{2}[-,/]\d{2}.*$/;
  const isValidDate = datePattern.test(dateString);

  if (isValidString(dateString) && isValidDate) return dateString.slice(0, 10);

  return '** Invalid/Missing Date **';
};

export const priceCentsToDollars = (priceCents) => {
  if (isInteger({ value: priceCents, positiveOnly: true }))
    return (priceCents / 100).toFixed(2);

  logException(
    Errors.INVALID.DATA('non-zero, positive integer', typeof priceCents),
  );
  return '??';
};

export const toBemClassName = ({
  bemBlock,
  bemElem,
  bemMod,
  bemMod2,
  showMod2 = false,
} = {}) => {
  if (!isValidString(bemBlock)) return 'invalid-missing-block';

  const baseClass = isValidString(bemElem)
    ? `${bemBlock}__${bemElem}`
    : `${bemBlock}`;

  return clsx(baseClass, {
    [`${baseClass}--${bemMod}`]: isValidString(bemMod),
    [`${baseClass}--${bemMod2}`]: isValidString(bemMod2) && showMod2,
  });
};

// validators

export const isInteger = ({ value, positiveOnly = false, min1 = false }) => {
  const base = min1 ? 1 : 0;

  if (typeof value === DataTypes.NUMBER)
    return Number.isInteger(value) && (!positiveOnly || value >= base);

  if (isValidString(value)) {
    const numeric = Number(value.trim());
    return Number.isInteger(numeric) && (!positiveOnly || numeric >= base);
  }

  return false;
};

// sort comparators

export const compareSortValues = ({
  key = null,
  type = DataTypes.STRING,
  direction = 'asc',
} = {}) => {
  const multiplier = direction === 'asc' ? 1 : -1;

  if (type === DataTypes.NUMBER) {
    return (a, b) => {
      const valueA = Number(key ? a[key] : a);
      const valueB = Number(key ? b[key] : b);
      return (valueA - valueB) * multiplier;
    };
  }

  if (type === DataTypes.STRING) {
    return (a, b) => {
      const valueA = String(key ? a[key] : a);
      const valueB = String(key ? b[key] : b);
      return valueA.localeCompare(valueB) * multiplier;
    };
  }

  const validDataTypes = [DataTypes.STRING, DataTypes.NUMBER];

  logException(Errors.INVALID.DATA(validDataTypes.join(', '), type));
  return () => 0;
};

// error handling

export const logException = (message, err = null) =>
  console.error(message, err);
