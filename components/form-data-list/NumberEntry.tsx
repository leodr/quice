import React, { ReactElement, useMemo } from "react";
import { prettifyPropertyName } from "./propertyName";

interface NumberEntryProps {
	propertyName: string;
	value: number;
}

export default function NumberEntry({
	propertyName,
	value,
}: NumberEntryProps): ReactElement {
	const prettifiedPropertyName = useMemo(
		() => prettifyPropertyName(propertyName),
		[propertyName]
	);

	return (
		<div className="sm:col-span-1">
			<dt className="text-sm font-medium text-gray-500">
				{prettifiedPropertyName}
			</dt>
			<dd className="mt-1 text-sm text-gray-900">{value.toLocaleString()}</dd>
		</div>
	);
}
