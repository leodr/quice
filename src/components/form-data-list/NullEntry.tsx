import React, { ReactElement } from "react";

interface Props {
	propertyName: string;
}

export default function NullEntry({ propertyName }: Props): ReactElement {
	return (
		<div className="sm:col-span-1">
			<dt className="text-sm font-medium text-gray-500">{propertyName}</dt>
			<dd className="mt-1 text-sm text-gray-900">-</dd>
		</div>
	);
}
