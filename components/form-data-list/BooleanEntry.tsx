import React, { ReactElement, useMemo } from "react";
import { SmallCheckIcon } from "../icons/small/Check";
import { SmallXIcon } from "../icons/small/X";
import { prettifyPropertyName } from "./propertyName";

interface BooleanEntryProps {
	propertyName: string;
	value: boolean;
}

export default function BooleanEntry({
	propertyName,
	value,
}: BooleanEntryProps): ReactElement {
	const prettifiedPropertyName = useMemo(
		() => prettifyPropertyName(propertyName),
		[propertyName]
	);

	if (value) {
		return (
			<div className="sm:col-span-1">
				<dt className="text-sm font-medium text-gray-500">
					{prettifiedPropertyName}
				</dt>
				<dd className="mt-1 text-sm text-green-600">
					<SmallCheckIcon className="h-5 w-5 -ml-px" />
				</dd>
			</div>
		);
	}

	return (
		<div className="sm:col-span-1">
			<dt className="text-sm font-medium text-gray-500">
				{prettifiedPropertyName}
			</dt>
			<dd className="mt-1 text-sm text-red-600">
				<SmallXIcon className="h-5 w-5 -ml-1" />
			</dd>
		</div>
	);
}
