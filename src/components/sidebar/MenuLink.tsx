import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ComponentType, ReactElement, SVGProps } from "react";

interface Props {
	href: string;
	Icon: ComponentType<SVGProps<SVGSVGElement>>;
	children: string;
}

export default function MenuLink({
	children,
	href,
	Icon,
}: Props): ReactElement {
	const router = useRouter();

	const isSelected = router.asPath.startsWith(href);

	return (
		<Link href={href}>
			<a
				className={clsx(
					"group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-75",
					isSelected && "bg-gray-200 text-gray-900",
					!isSelected && "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
				)}
			>
				<Icon
					className={clsx(
						"mr-3 h-6 w-6 transition-colors duration-75",
						isSelected && "text-gray-500",
						!isSelected && "text-gray-400 group-hover:text-gray-500"
					)}
					aria-hidden="true"
				/>
				{children}
			</a>
		</Link>
	);
}
