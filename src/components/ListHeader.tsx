import React, { ReactElement, ReactNode } from "react";

interface Props {
	headline: string;
	children: ReactNode;
	action?: ReactNode;
}

export default function ListHeader({
	children,
	headline,
	action,
}: Props): ReactElement {
	return (
		<div className="px-6 py-6">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-medium text-gray-900">{headline}</h2>
				{action}
			</div>
			<p className="mt-1 text-sm text-gray-600">{children}</p>
		</div>
	);
}
