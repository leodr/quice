import React, { ReactElement, useMemo } from "react";
import { JsonObject } from "type-fest";
import { DataEntry } from "./DataEntry";

interface DataListProps {
	data: JsonObject;
}

export function DataList({ data }: DataListProps): ReactElement {
	const dataEntries = useMemo(() => Object.entries(data), [data]);

	const sortedDataEntries = useMemo(
		() =>
			Array.from(dataEntries).sort((a, b) => {
				if (a[0] < b[0]) {
					return -1;
				}
				if (a[0] > b[0]) {
					return 1;
				}
				return 0;
			}),
		[dataEntries]
	);

	return (
		<>
			{sortedDataEntries.map(([key, value]) => {
				if (value === undefined) return null;

				return <DataEntry key={key} propertyName={key} value={value} />;
			})}
		</>
	);
}
