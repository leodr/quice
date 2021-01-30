import React, { ReactElement } from "react";
import type { JsonValue } from "type-fest";
import { ArrayEntry } from "./ArrayEntry";
import BooleanEntry from "./BooleanEntry";
import NullEntry from "./NullEntry";
import NumberEntry from "./NumberEntry";
import ObjectEntry from "./ObjectEntry";
import { StringEntry } from "./StringEntry";

interface DataEntryProps {
	propertyName: string;
	value: JsonValue;
}

export function DataEntry({
	propertyName,
	value,
}: DataEntryProps): ReactElement {
	switch (typeof value) {
		case "string":
			return <StringEntry propertyName={propertyName} value={value} />;
		case "boolean":
			return <BooleanEntry propertyName={propertyName} value={value} />;
		case "number":
			return <NumberEntry propertyName={propertyName} value={value} />;
		case "object":
			if (value === null) {
				return <NullEntry propertyName={propertyName} />;
			}

			if (Array.isArray(value)) {
				return <ArrayEntry propertyName={propertyName} value={value} />;
			}

			return <ObjectEntry propertyName={propertyName} value={value} />;

		default:
			throw Error("Unknown data type for value.");
	}
}
