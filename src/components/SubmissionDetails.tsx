import { Transition } from "@headlessui/react";
import React, { ReactElement, useState } from "react";
import { getSubmissionTitle } from "src/lib/submissionTitle";
import { FormSubmission } from "src/types/form";
import { DataList } from "./form-data-list/DataList";
import { SmallClockIcon } from "./icons/small/Clock";
import { SmallHashtagIcon } from "./icons/small/Hashtag";
import { SmallLinkIcon } from "./icons/small/Link";
import { SmallUserAddIcon } from "./icons/small/UserAdd";

interface Props {
	submission: FormSubmission | null;
}

export function SubmissionDetails({ submission }: Props): ReactElement {
	const [showDropdown, setShowDropdown] = useState(false);

	if (!submission)
		return (
			<div className="flex items-center justify-center p-8">
				<p className="text-gray-500">
					Select a submission from the list to see details about it.
				</p>
			</div>
		);

	return (
		<article>
			<div className="sm:mt-2">
				<div className="py-8 border-b border-gray-200">
					<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="lg:flex lg:items-center lg:justify-between">
							<div className="flex-1 min-w-0">
								<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl truncate">
									{getSubmissionTitle(submission)}
								</h2>
								<div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
									<div className="mt-2 flex items-center text-sm text-gray-500">
										<SmallClockIcon
											className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
										January 14, 14:38
									</div>
									<div className="mt-2 flex items-center text-sm text-gray-500">
										<SmallHashtagIcon
											className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
										{submission.id}
									</div>
								</div>
							</div>
							<div className="mt-5 flex lg:mt-0 lg:ml-4">
								<span className="hidden sm:block">
									<button
										type="button"
										className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
									>
										<SmallUserAddIcon
											className="-ml-1 mr-2 h-5 w-5 text-gray-500"
											aria-hidden="true"
										/>
										Assign to
									</button>
								</span>
								<span className="hidden sm:block ml-3">
									<button
										type="button"
										className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
									>
										<SmallLinkIcon
											className="-ml-1 mr-2 h-5 w-5 text-gray-500"
											aria-hidden="true"
										/>
										Share
									</button>
								</span>
								<span className="sm:ml-3">
									<button
										type="button"
										className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
									>
										{/* Heroicon name: check */}
										<svg
											className="-ml-1 mr-2 h-5 w-5"
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
										Mark as done
									</button>
								</span>
								{/* Dropdown */}
								<span className="ml-3 relative sm:hidden">
									<button
										type="button"
										className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
										id="mobile-menu"
										aria-haspopup="true"
										onClick={() => setShowDropdown(!showDropdown)}
									>
										More
										{/* Heroicon name: chevron-down */}
										<svg
											className="-mr-1 ml-2 h-5 w-5 text-gray-500"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
									<Transition
										show={showDropdown}
										enter="transition ease-out duration-200"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
										className="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
										aria-labelledby="mobile-menu"
										role="menu"
									>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											role="menuitem"
										>
											Edit
										</a>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											role="menuitem"
										>
											View
										</a>
									</Transition>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Description list */}
			<div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				<dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
					{submission && <DataList data={submission.data} />}
				</dl>
			</div>
		</article>
	);
}
