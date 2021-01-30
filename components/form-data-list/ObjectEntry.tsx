import React, { ReactElement, useMemo } from "react";
import { JsonObject } from "type-fest";
import { prettifyPropertyName } from "./propertyName";

interface ObjectEntryProps {
	propertyName: string;
	value: JsonObject;
}

export default function ObjectEntry({
	propertyName,
	value,
}: ObjectEntryProps): ReactElement {
	const prettifiedPropertyName = useMemo(
		() => prettifyPropertyName(propertyName),
		[propertyName]
	);

	return (
		<div className="sm:col-span-1">
			<dt className="text-sm font-medium text-gray-500">
				{prettifiedPropertyName}
			</dt>
			<dd className="mt-1 text-sm text-gray-900">
				<pre>{JSON.stringify(value, null, 2)}</pre>
			</dd>
		</div>
	);
}
