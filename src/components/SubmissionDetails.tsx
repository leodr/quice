import { Transition } from "@headlessui/react";
import clsx from "clsx";
import SolidBanIcon from "heroicons/solid/ban.svg";
import SolidCheckIcon from "heroicons/solid/check.svg";
import SolidChevronDownIcon from "heroicons/solid/chevron-down.svg";
import SolidClockIcon from "heroicons/solid/clock.svg";
import SolidHashtagIcon from "heroicons/solid/hashtag.svg";
import SolidLinkIcon from "heroicons/solid/link.svg";
import SolidUserAddIcon from "heroicons/solid/user-add.svg";
import React, { ReactElement, useState } from "react";
import { firestore } from "src/firebase/client";
import { FormSubmission } from "src/types/form";
import { getSubmissionTitle } from "src/utils/getSubmissionTitle";
import DataList from "./form-data-list/DataList";
import { useSnack } from "./SnackbarProvider";

interface Props {
  submission: FormSubmission | null;
}

export default function SubmissionDetails({ submission }: Props): ReactElement {
  const [showDropdown, setShowDropdown] = useState(false);

  const showSnackbar = useSnack();

  if (!submission)
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-500">
          Select a submission from the list to see details about it.
        </p>
      </div>
    );

  function handleMarkAsDone() {
    firestore
      .collection("submissions")
      .doc(submission?.id)
      .update({ done: !submission?.done });
  }

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
                    <SolidClockIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    January 14, 14:38
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <SolidHashtagIcon
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
                    <SolidUserAddIcon
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
                    onClick={async () => {
                      await navigator.clipboard.writeText(window.location.href);

                      showSnackbar("URL copied to clipboard.");
                    }}
                  >
                    <SolidLinkIcon
                      className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                    Share
                  </button>
                </span>
                <span className="sm:ml-3">
                  <button
                    type="button"
                    className={clsx(
                      "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400",
                      submission?.done
                        ? "border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                        : "bg-rose-500 hover:bg-rose-600 text-white"
                    )}
                    onClick={handleMarkAsDone}
                  >
                    {submission?.done ? (
                      <SolidCheckIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <SolidBanIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    {submission?.done ? "Mark as undone" : "Mark as done"}
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
                    <SolidChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
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
