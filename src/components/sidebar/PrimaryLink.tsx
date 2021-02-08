import clsx from "clsx";
import Link from "next/link";
import React, { ComponentType, ReactElement, SVGProps } from "react";
import { useIsCurrentPath } from "src/hooks/useIsCurrentPath";

interface Props {
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  children: string;
}

export default function PrimaryLink({
  children,
  href,
  Icon,
}: Props): ReactElement {
  const isActive = useIsCurrentPath(href);

  const linkClasses = clsx(
    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-75",
    isActive && "bg-gray-200 text-gray-900",
    !isActive && "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
  );

  const iconClasses = clsx(
    "mr-3 h-6 w-6 transition-colors duration-75",
    isActive && "text-gray-500",
    !isActive && "text-gray-400 group-hover:text-gray-500"
  );

  return (
    <Link href={href}>
      <a className={linkClasses}>
        <Icon className={iconClasses} aria-hidden="true" />
        {children}
      </a>
    </Link>
  );
}
