import React, { ReactElement } from "react";
import { JsonObject } from "type-fest";

interface Props {
	propertyName: string;
	value: JsonObject;
}

export default function ObjectEntry({
	propertyName,
	value,
}: Props): ReactElement {
	return (
		<div className="sm:col-span-1">
			<dt className="text-sm font-medium text-gray-500">{propertyName}</dt>
			<dd className="mt-1 text-sm text-gray-900">
				<pre>{JSON.stringify(value, null, 2)}</pre>
			</dd>
		</div>
	);
}
