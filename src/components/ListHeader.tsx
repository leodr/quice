import React, { ReactElement, ReactNode } from "react";

interface Props {
	headline: string;
	children: ReactNode;
}

export function ListHeader({ children, headline }: Props): ReactElement {
	return (
		<div className="px-6 py-6">
			<h2 className="text-lg font-medium text-gray-900">{headline}</h2>
			<p className="mt-1 text-sm text-gray-600">{children}</p>
		</div>
	);
}
