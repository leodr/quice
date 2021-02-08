import React, { ReactElement } from "react";

interface Props {
  propertyName: string;
  value: number;
}

export default function NumberEntry({
  propertyName,
  value,
}: Props): ReactElement {
  return (
    <div className="sm:col-span-1">
      <dt className="text-sm font-medium text-gray-500">{propertyName}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value.toLocaleString()}</dd>
    </div>
  );
}
