// /client/src/components/tables/mapped-table/MappedTableRow.jsx

import { Link } from "react-router-dom";

import RowFrame from "../frames/RowFrame";

import { toClassName, isInteger } from "../../../helpers/helpers";
import { MAPPED_TABLE_ERROR_MESSAGES as ERROR } from "./strings";
import {
  CELL_REGISTRY,
  NORMALIZER_REGISTRY,
  PATH_BUILDER_REGISTRY,
  ID_FINDER_REGISTRY,
} from "./MappedTableRegistry";

const EarlyReturn = ({ colSpan, message }) => (
  <tr>
    <td colSpan={colSpan}>{message}</td>
  </tr>
)

export default function MappedTableRow({ tableConfig, data, bemRoot }) {
  const isValidData = typeof data === "object" && Object.keys(data).length > 0;

  const {
    columns,
    tableRegistryKey,
    loadingMessage = "Loading...",
    emptyMessage = "Data unavailable.",
  } = tableConfig;

  const getId = ID_FINDER_REGISTRY[tableRegistryKey];
  const id = getId(data);
  const isValidId = isInteger({ value: id, positiveOnly: true });

  const colSpan = columns?.length ?? 1;

  if (!data) return <EarlyReturn colSpan={colSpan} message={loadingMessage} />;
  if (!isValidData) return <EarlyReturn colSpan={colSpan} message={emptyMessage} />;

  const buildPath = PATH_BUILDER_REGISTRY[tableRegistryKey];
  const normalize = NORMALIZER_REGISTRY[tableRegistryKey];

  const isValidBuildPath = !!buildPath && typeof buildPath === "function";
  const isValidNormalize = !!normalize && typeof normalize === "function";

  if (!id) console.warn(ERROR.MISSING_ID);
  if (!isValidId) console.warn(ERROR.INVALID_ID);
  if (!buildPath) console.warn(ERROR.MISSING_BUILD_PATH);
  if (!isValidBuildPath) console.warn(ERROR.INVALID_BUILD_PATH);

  const isLink = isValidBuildPath && isValidId;

  if (!normalize) return <EarlyReturn colSpan={colSpan} message={ERROR.MISSING_NORMALIZE} />;
  if (!isValidNormalize) return <EarlyReturn colSpan={colSpan} message={ERROR.INVALID_NORMALIZE} />;

  const normalizedData = normalize(data);

  const { bemBlock } = bemRoot;

  const frameProps = {
    bemRoot: { bemBlock, bemElem: "row", bemMod: "body" },
  };

  return (
    <RowFrame {...frameProps}>
      {columns.map(({ dataKey, cellRegistryKey }, index) => (
        <MappedTableCell
          key={dataKey}
          path={index === 0 && isLink ? buildPath(id) : null}
          data={normalizedData[dataKey] ?? null}
          cellRegistryKey={cellRegistryKey}
          bemRoot={{ bemBlock, bemElem: "cell", bemMod: dataKey }}
        />
      ))}
    </RowFrame>
  );
}

const MappedTableCell = ({ data, cellRegistryKey, bemRoot, path }) => {
  const Component = CELL_REGISTRY[cellRegistryKey];
  return (
    <td className={toClassName({ ...bemRoot })}>
      {!!path ? <Link to={path}>{data}</Link> : <Component data={data} />}
    </td>
  );
}