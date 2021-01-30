import React, { ReactElement, useMemo } from "react";
import { JsonArray } from "type-fest";
import { prettifyPropertyName } from "./propertyName";

interface ArrayEntryProps {
	propertyName: string;
	value: JsonArray;
}

export function ArrayEntry({
	propertyName,
	value,
}: ArrayEntryProps): ReactElement {
	const prettifiedPropertyName = useMemo(
		() => prettifyPropertyName(propertyName),
		[propertyName]
	);

	return (
		<div className="sm:col-span-1">
			<dt className="text-sm font-medium text-gray-500">
				{prettifiedPropertyName}
			</dt>
			<dd className="mt-1 text-sm text-gray-900">{value}</dd>
		</div>
	);
}
