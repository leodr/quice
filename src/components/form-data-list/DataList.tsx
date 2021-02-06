import React, { ReactElement, useMemo } from "react";
import { JsonObject } from "type-fest";
import DataEntry from "./DataEntry";

interface Props {
  data: JsonObject;
}

export default function DataList({ data }: Props): ReactElement {
  const sortedDataEntries = useMemo(() => {
    const entries = Object.entries(data);

    /**
     * Sorts the data entries by name.
     */
    return Array.from(entries).sort((a, b) => {
      if (a[0] < b[0]) return -1;
      if (a[0] > b[0]) return 1;
      return 0;
    });
  }, [data]);

  return (
    <>
      {sortedDataEntries.map(([key, value]) => {
        if (value === undefined) return null;

        return <DataEntry key={key} propertyName={key} value={value} />;
      })}
    </>
  );
}
