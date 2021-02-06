import clsx from "clsx";
import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";
import { useIsCurrentPath } from "src/hooks/useIsCurrentPath";

interface Props {
  href: string;
  children: ReactNode;
  leading: ReactNode;
}

export default function SecondaryLink({
  href,
  leading,
  children,
}: Props): ReactElement {
  const isActive = useIsCurrentPath(href);

  const linkClasses = clsx(
    "w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md",
    isActive
      ? "bg-gray-200 text-gray-900"
      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
  );

  return (
    <Link href={href}>
      <a type="button" className={linkClasses}>
        {leading}
        <span className="truncate">{children}</span>
      </a>
    </Link>
  );
}
