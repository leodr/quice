import { CheckIcon, XIcon } from "@heroicons/react/solid";
import React, { ReactElement } from "react";

interface Props {
  propertyName: string;
  value: boolean;
}

export default function BooleanEntry({
  propertyName,
  value,
}: Props): ReactElement {
  if (value) {
    return (
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">{propertyName}</dt>
        <dd className="mt-1 text-sm text-green-600">
          <span className="sr-only">True</span>
          <CheckIcon className="h-5 w-5 -ml-px" aria-hidden="true" />
        </dd>
      </div>
    );
  }

  return (
    <div className="sm:col-span-1">
      <dt className="text-sm font-medium text-gray-500">{propertyName}</dt>
      <dd className="mt-1 text-sm text-red-600">
        <span className="sr-only">False</span>
        <XIcon className="h-5 w-5 -ml-1" aria-hidden="true" />
      </dd>
    </div>
  );
}
