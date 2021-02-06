import React, { ReactElement, useMemo } from "react";
import { prettifyPropertyName } from "src/utils/prettifyPropertyName";
import type { JsonValue } from "type-fest";
import ArrayEntry from "./ArrayEntry";
import BooleanEntry from "./BooleanEntry";
import NullEntry from "./NullEntry";
import NumberEntry from "./NumberEntry";
import ObjectEntry from "./ObjectEntry";
import StringEntry from "./StringEntry";

interface DataEntryProps {
	propertyName: string;
	value: JsonValue;
}

export default function DataEntry({
	propertyName,
	value,
}: DataEntryProps): ReactElement {
	const prettyName = useMemo(() => prettifyPropertyName(propertyName), [
		propertyName,
	]);

	switch (typeof value) {
		case "string":
			return <StringEntry propertyName={prettyName} value={value} />;
		case "boolean":
			return <BooleanEntry propertyName={prettyName} value={value} />;
		case "number":
			return <NumberEntry propertyName={prettyName} value={value} />;
		case "object":
			if (value === null) {
				return <NullEntry propertyName={prettyName} />;
			}

			if (Array.isArray(value)) {
				return <ArrayEntry propertyName={prettyName} value={value} />;
			}

			return <ObjectEntry propertyName={prettyName} value={value} />;

		default:
			throw Error("Unknown data type for value.");
	}
}
