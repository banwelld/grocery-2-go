import { memo } from 'react';
import { Link } from 'react-router-dom';
import { DataTypes } from '../../../config/constants';
import clsx from 'clsx';
import {
  CELL_REGISTRY,
  ID_FINDER_REGISTRY,
  NORMALIZER_REGISTRY,
  PATH_BUILDER_REGISTRY,
} from '../utils/MappedTableRegistry';

// Expects a colocated 'MappedTable.css' for styles.
// Remove this import if handling styles globally or via a different method.
import './MappedTable.css';

/**
 * **MappedTable**
 *
 * returns a JSX element comprising the frame of a table:
 *  - table
 *    - colgroup
 *    - thead / th
 *    - tbody
 *
 * validates table data and config data, returning a renderable message if validation
 * fails so that cohesive Ux is not interrupted.
 *
 * MappedTable component colocated with its descendent components:
 *  - MappedTableColumnGroup
 *  - MappedTableHeader
 *  - MappedTableBody
 *  - MappedTableRow
 *  - MappedTableCell
 *  - EarlyReturn
 *
 * includes embedded frames and helper functions to serve as a standalone,
 * portable table-generation module.
 */
export default function MappedTable({ data, tableConfig, parentBemBlock }) {
  const dataErrors = validateTableAssets(tableConfig, data);

  if (dataErrors.length > 0) {
    console.error('Table config and/or data is invalid or missing', dataErrors);
    return <p>*** Table configuration or data is missing or invalid ***</p>;
  }

  const { columns, tableRegistryKey } = tableConfig;

  // registry lookups
  const getId = ID_FINDER_REGISTRY[tableRegistryKey];
  const buildPath = PATH_BUILDER_REGISTRY[tableRegistryKey];
  const normalize = NORMALIZER_REGISTRY[tableRegistryKey];

  if (!getId) console.warn(ERROR.MISSING_ID_FINDER);
  if (!normalize) console.error(ERROR.MISSING_NORMALIZE);

  const tableLogic = {
    getId,
    buildPath,
    normalize,
    isLinkable: typeof buildPath === DataTypes.FUNCTION,
  };

  const bemRoot = { bemBlock: 'table', bemMod: parentBemBlock };
  const tableBodyProps = { data, tableConfig, bemRoot, tableLogic };

  return (
    <table
      className={toBemClassName({
        ...bemRoot,
        bemMod2: 'mapped',
        showMod2: true,
      })}
    >
      <MappedTableColumnGroup columns={columns} bemRoot={bemRoot} />
      <MappedTableHeader columns={columns} bemRoot={bemRoot} />
      <MappedTableBody {...tableBodyProps} />
    </table>
  );
}

// ==========================================
// Table Structure Components
// ==========================================

function MappedTableColumnGroup({ columns, bemRoot }) {
  const colBemProps = { ...bemRoot, bemElem: 'column', showMod2: true };
  return (
    <colgroup>
      {columns.map(({ dataKey }) => (
        <col
          key={dataKey}
          className={toBemClassName({ ...colBemProps, bemMod2: dataKey })}
        />
      ))}
    </colgroup>
  );
}

function MappedTableHeader({ columns, bemRoot }) {
  const cellBemProps = {
    ...bemRoot,
    bemElem: 'cell',
    bemMod2: 'head',
    showMod2: true,
  };

  return (
    <HeadFrame {...bemRoot}>
      <RowFrame bemRoot={{ ...bemRoot, bemMod: 'head' }}>
        {columns.map(({ dataKey, label }) => (
          <th
            key={dataKey}
            className={toBemClassName({ ...cellBemProps, bemMod2: dataKey })}
          >
            {label}
          </th>
        ))}
      </RowFrame>
    </HeadFrame>
  );
}

function MappedTableBody({ data, tableConfig, bemRoot, tableLogic }) {
  const rowProps = { tableConfig, bemRoot, tableLogic };

  return (
    <BodyFrame bemRoot={bemRoot}>
      {data.map((row) => (
        <MappedTableRow key={row.id} data={row} {...rowProps} />
      ))}
    </BodyFrame>
  );
}

// ==========================================
// Row & Cell Components
// ==========================================

const MappedTableRow = memo(({ tableConfig, data, bemRoot, tableLogic }) => {
  const { columns, columnCount, loadingMessage } = tableConfig;
  const { getId, buildPath, normalize, isLinkable } = tableLogic;

  if (!data)
    return <EarlyReturn colSpan={columnCount} message={loadingMessage} />;

  const id = getId?.(data);
  const isValidId = isInteger({ value: id, positiveOnly: true });
  const isRowLinkable = isLinkable && isValidId;

  if (!normalize)
    return (
      <EarlyReturn colSpan={columnCount} message={ERROR.MISSING_NORMALIZE} />
    );

  const normalizedData = normalize(data);
  const { bemBlock } = bemRoot;

  return (
    <RowFrame bemRoot={{ bemBlock, bemElem: 'row', bemMod: 'body' }}>
      {columns.map(({ dataKey, cellRegistryKey }, index) => (
        <MappedTableCell
          key={dataKey}
          path={index === 0 && isRowLinkable ? buildPath(id) : null}
          data={normalizedData[dataKey] ?? null}
          cellRegistryKey={cellRegistryKey}
          bemRoot={{ bemBlock, bemElem: 'cell', bemMod: dataKey }}
        />
      ))}
    </RowFrame>
  );
});

const MappedTableCell = memo(({ data, cellRegistryKey, bemRoot, path }) => {
  const Component = CELL_REGISTRY[cellRegistryKey];
  return (
    <td className={toBemClassName({ ...bemRoot })}>
      {!!path ? <Link to={path}>{data}</Link> : <Component data={data} />}
    </td>
  );
});

const EarlyReturn = ({ colSpan, message }) => (
  <tr>
    <td colSpan={colSpan}>{message}</td>
  </tr>
);

// ==========================================
// Data Validation
// ==========================================

const validateTableAssets = (tableConfig, data) => {
  const { columns = null } = tableConfig;

  const dataErrors = [];

  if (!Array.isArray(data)) dataErrors.push(ERROR.INVALID_DATA);
  if (!columns) dataErrors.push(ERROR.MISSING_COLUMNS);
  if (columns.length === 0) dataErrors.push(ERROR.EMPTY_COLUMNS);

  columns.forEach(({ dataKey }, index) => {
    if (!dataKey) dataErrors.push(ERROR.MISSING_KEY(index));
    if (!!dataKey && !isValidString(dataKey))
      dataErrors.push(ERROR.INVALID_KEY(index));
  });

  return dataErrors;
};

// ==========================================
// Embedded Frames
// ==========================================

function BodyFrame({ bemRoot, children }) {
  return (
    <tbody className={toBemClassName({ ...bemRoot, bemElem: 'body' })}>
      {children}
    </tbody>
  );
}

function HeadFrame({ bemBlock, bemMod, children }) {
  return (
    <thead className={toBemClassName({ bemBlock, bemElem: 'head', bemMod })}>
      {children}
    </thead>
  );
}

function RowFrame({ bemRoot, children }) {
  return <tr className={toBemClassName({ ...bemRoot })}>{children}</tr>;
}

// ==========================================
// Embedded Helpers & Strings
// ==========================================

const ERROR = {
  INVALID_DATA: 'Invalid table data: expected an array.',
  MISSING_ID_FINDER: 'Invalid tableConfig: ID finder not found in registry.',
  MISSING_NORMALIZE: "Invalid tableConfig: missing 'normalize' function.",
  INVALID_NORMALIZE: "Invalid tableConfig: 'normalize' is not a function.",
  MISSING_COLUMNS: "Invalid tableConfig: missing 'columns' array.",
  INVALID_COLUMNS: "Invalid tableConfig: 'columns' is not an array.",
  EMPTY_COLUMNS: "Invalid tableConfig: 'columns' array is empty.",
  MISSING_KEY: (columnIndex) =>
    `Invalid column (index: ${columnIndex}): missing 'dataKey' property.`,
  INVALID_KEY: (columnIndex) =>
    `Invalid column (index: ${columnIndex}): 'dataKey' is not a non-empty string.`,
  DUPLICATE_KEY: "Invalid tableConfig: duplicate 'dataKey' property detected.",
  COLUMN_COUNT_MISMATCH:
    "Invalid tableConfig: 'columns' array length does not match span sum.",
};

export const isValidString = (string) =>
  typeof string === 'string' && string.trim().length > 0;

export const isInteger = ({ value, positiveOnly = false, min1 = false }) => {
  const base = min1 ? 1 : 0;

  if (typeof value === 'number')
    return Number.isInteger(value) && (!positiveOnly || value >= base);

  if (isValidString(value)) {
    const numeric = Number(value.trim());
    return Number.isInteger(numeric) && (!positiveOnly || numeric >= base);
  }

  return false;
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

export const logException = (message, err) => console.error(message, err);
