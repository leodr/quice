import React, { ReactElement } from "react";
import { JsonArray } from "type-fest";

interface Props {
  propertyName: string;
  value: JsonArray;
}

export default function ArrayEntry({
  propertyName,
  value,
}: Props): ReactElement {
  return (
    <div className="sm:col-span-1">
      <dt className="text-sm font-medium text-gray-500">{propertyName}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}
