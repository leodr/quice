import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import SolidCheckIcon from "heroicons/solid/check.svg";
import SolidSelectorIcon from "heroicons/solid/selector.svg";
import React, { ReactElement } from "react";
import { FormColor } from "src/types/form";

const colors: FormColor[] = [
  "green",
  "indigo",
  "orange",
  "pink",
  "purple",
  "teal",
  "yellow",
];

interface Props {
  open: boolean;
  color: FormColor;
}

export default function ColorSelect({ open, color }: Props): ReactElement {
  return (
    <>
      <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-rose-400 sm:text-sm">
        <div className="flex items-center">
          <span
            aria-label="Online"
            className={`bg-${color}-400 flex-shrink-0 inline-block h-2 w-2 rounded-full`}
          />
          <span className="ml-3 block truncate">
            {capitalizeFirstLetter(color)}
          </span>
        </div>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SolidSelectorIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>
      <Transition
        show={open}
        className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
        enter=""
        enterFrom=""
        enterTo=""
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options
          static
          className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        >
          {colors.map((color) => (
            <Listbox.Option
              key={color}
              value={color}
              className={({ active }) =>
                clsx(
                  "text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9",
                  active && "bg-gray-200"
                )
              }
            >
              {({ selected }) => (
                <>
                  <div className="flex items-center">
                    <span
                      className={`bg-${color}-500 flex-shrink-0 inline-block h-2 w-2 rounded-full`}
                      aria-hidden="true"
                    />
                    <span
                      className={clsx(
                        "ml-3 block truncate",
                        selected ? "font-semibold" : "font-normal"
                      )}
                    >
                      {capitalizeFirstLetter(color)}
                    </span>
                  </div>

                  {selected && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-rose-500">
                      <SolidCheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </>
  );
}

function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.substr(1);
}
