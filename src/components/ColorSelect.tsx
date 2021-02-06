import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { ReactElement } from "react";
import { FormColor } from "src/types/form";

export const colors: FormColor[] = [
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
					{/* Heroicon name: selector */}
					<svg
						className="h-5 w-5 text-gray-400"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
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
											{/* Heroicon name: check */}
											<svg
												className="h-5 w-5"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
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
