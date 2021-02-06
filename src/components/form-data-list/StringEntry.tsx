import React, { ReactElement } from "react";
import Linkify from "react-linkify";

interface Props {
	propertyName: string;
	value: string;
}

export default function StringEntry({
	propertyName,
	value,
}: Props): ReactElement {
	let displayValue = value.trim();

	if (displayValue === "") {
		displayValue = "-";
	}

	return (
		<div className="sm:col-span-1">
			<dt className="text-sm font-medium text-gray-500">{propertyName}</dt>
			<dd className="mt-1 text-sm text-gray-900">
				<Linkify
					componentDecorator={(href, text, key) => (
						<a
							href={href}
							key={key}
							className="text-indigo-500"
							target="_blank"
							rel="noopener noreferrer"
						>
							{text.toLowerCase()}
						</a>
					)}
				>
					{displayValue}
				</Linkify>
			</dd>
		</div>
	);
}
