import { Link, useNavigate } from 'react-router-dom';
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

// MappedTable component colocated with its child components:
//   - MappedTableColumnGroup
//   - MappedTableHeader
//   - MappedTableBody
//   - MappedTableRow (and MappedTableCell, EarlyReturn)
//
// Also includes embedded frames (BodyFrame, HeadFrame, RowFrame)
// and helper functions to serve as a standalone, portable table module.

// ==========================================
// Main Component
// ==========================================

export default function MappedTable({ data, tableConfig, parentBemBlock }) {
  const dataErrors = validateTableAssets(tableConfig, data);

  if (dataErrors.length > 0) {
    console.error('Table config and/or data is invalid or missing', dataErrors);
    return <p>*** Table configuration or data is missing or invalid ***</p>;
  }
  const { columns } = tableConfig;

  const bemRoot = { bemBlock: 'table', bemMod: parentBemBlock };
  const tableBodyProps = { data, tableConfig, bemRoot };

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

function MappedTableBody({ data, tableConfig, bemRoot }) {
  const rowProps = { tableConfig, bemRoot };

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

function MappedTableRow({ tableConfig, data, bemRoot }) {
  const isValidData =
    typeof data === DataTypes.OBJECT && Object.keys(data).length > 0;

  const {
    columns,
    tableRegistryKey,
    loadingMessage = 'Loading...',
    emptyMessage = 'Data unavailable.',
  } = tableConfig;

  const getId = ID_FINDER_REGISTRY[tableRegistryKey];
  const id = getId(data);
  const isValidId = isInteger({ value: id, positiveOnly: true });

  const colSpan = columns?.length ?? 1;

  if (!data) return <EarlyReturn colSpan={colSpan} message={loadingMessage} />;
  if (!isValidData)
    return <EarlyReturn colSpan={colSpan} message={emptyMessage} />;

  const buildPath = PATH_BUILDER_REGISTRY[tableRegistryKey];
  const normalize = NORMALIZER_REGISTRY[tableRegistryKey];

  const isValidBuildPath =
    !!buildPath && typeof buildPath === DataTypes.FUNCTION;
  const isValidNormalize =
    !!normalize && typeof normalize === DataTypes.FUNCTION;

  if (!id) console.warn(ERROR.MISSING_ID);
  if (!isValidId) console.warn(ERROR.INVALID_ID);
  if (!buildPath) console.warn(ERROR.MISSING_BUILD_PATH);
  if (!isValidBuildPath) console.warn(ERROR.INVALID_BUILD_PATH);

  const isLink = isValidBuildPath && isValidId;

  if (!normalize)
    return <EarlyReturn colSpan={colSpan} message={ERROR.MISSING_NORMALIZE} />;
  if (!isValidNormalize)
    return <EarlyReturn colSpan={colSpan} message={ERROR.INVALID_NORMALIZE} />;

  const normalizedData = normalize(data);

  const { bemBlock } = bemRoot;

  return (
    <RowFrame bemRoot={{ bemBlock, bemElem: 'row', bemMod: 'body' }}>
      {columns.map(({ dataKey, cellRegistryKey }, index) => (
        <MappedTableCell
          key={dataKey}
          path={index === 0 && isLink ? buildPath(id) : null}
          data={normalizedData[dataKey] ?? null}
          cellRegistryKey={cellRegistryKey}
          bemRoot={{ bemBlock, bemElem: 'cell', bemMod: dataKey }}
        />
      ))}
    </RowFrame>
  );
}

const MappedTableCell = ({ data, cellRegistryKey, bemRoot, path }) => {
  const Component = CELL_REGISTRY[cellRegistryKey];
  return (
    <td className={toBemClassName({ ...bemRoot })}>
      {!!path ? <Link to={path}>{data}</Link> : <Component data={data} />}
    </td>
  );
};

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
    <thead className={`${bemBlock}__head ${bemBlock}__head--${bemMod}`}>
      {children}
    </thead>
  );
}

function RowFrame({ buildPath, id, bemRoot, children }) {
  const navigate = useNavigate();

  const onClick = () => navigate(buildPath(id));

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(buildPath(id));
    }
  };

  const navProps =
    !!buildPath && !!id
      ? { role: 'button', tabIndex: 0, onClick, onKeyDown }
      : {};

  const rowProps = { className: toBemClassName({ ...bemRoot }), ...navProps };

  return <tr {...rowProps}>{children}</tr>;
}

// ==========================================
// Embedded Helpers & Strings
// ==========================================

const ERROR = {
  INVALID_DATA: 'Invalid table data: expected an array.',
  MISSING_NORMALIZE: "Invalid tableConfig: missing 'normalize' function.",
  INVALID_NORMALIZE: "Invalid tableConfig: 'normalize' is not a function.",
  MISSING_COLUMNS: "Invalid tableConfig: missing 'columns' array.",
  INVALID_COLUMNS: "Invalid tableConfig: 'columns' is not an array.",
  EMPTY_COLUMNS: "Invalid tableConfig: 'columns' array is empty.",
  MISSING_KEY: (columnIndex) =>
    `Invalid column (index: ${columnIndex}): missing 'dataKey' property.`,
  INVALID_KEY: (columnIndex) =>
    `Invalid column (index: ${columnIndex}): 'dataKey' is not a non-empty string.`,
  INVALID_COLSPAN: (columnIndex) =>
    `Invalid column (index: ${columnIndex}): 'headerColSpan' is not an integer.`,
  DUPLICATE_KEY: "Invalid tableConfig: duplicate 'dataKey' property detected.",
  COLUMN_COUNT_MISMATCH:
    "Invalid tableConfig: 'columns' array length does not match span sum.",
  MISSING_ID:
    'MappedTableRow: ID was not provided; rows will not be clickable.',
  INVALID_ID:
    'MappedTableRow: ID was not an integer; rows will not be clickable.',
  MISSING_BUILD_PATH:
    'MappedTableRow: buildPath was not provided; rows will not be clickable.',
  INVALID_BUILD_PATH:
    'MappedTableRow: invalid buildPath function provided; rows will not be clickable.',
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
