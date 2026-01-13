// /client/src/components/tables/mapped-table/strings.js

export const MAPPED_TABLE_ERROR_MESSAGES = {
    INVALID_DATA: "Invalid table data: expected an array.",
    MISSING_NORMALIZE: "Invalid tableConfig: missing 'normalize' function.",
    INVALID_NORMALIZE: "Invalid tableConfig: 'normalize' is not a function.",
    MISSING_COLUMNS: "Invalid tableConfig: missing 'columns' array.",
    INVALID_COLUMNS: "Invalid tableConfig: 'columns' is not an array.",
    EMPTY_COLUMNS: "Invalid tableConfig: 'columns' array is empty.",
    MISSING_KEY: (columnIndex) => `Invalid column (index: ${columnIndex}): missing 'dataKey' property.`,
    INVALID_KEY: (columnIndex) => `Invalid column (index: ${columnIndex}): 'dataKey' is not a non-empty string.`,
    INVALID_COLSPAN: (columnIndex) => `Invalid column (index: ${columnIndex}): 'headerColSpan' is not an integer.`,
    DUPLICATE_KEY: "Invalid tableConfig: duplicate 'dataKey' property detected.",
    COLUMN_COUNT_MISMATCH: "Invalid tableConfig: 'columns' array length does not match span sum.",
    MISSING_ID: "MappedTableRow: ID was not provided; rows will not be clickable.",
    INVALID_ID: "MappedTableRow: ID was not an integer; rows will not be clickable.",
    MISSING_BUILD_PATH: "MappedTableRow: buildPath was not provided; rows will not be clickable.",
    INVALID_BUILD_PATH: "MappedTableRow: invalid buildPath function provided; rows will not be clickable.",
}