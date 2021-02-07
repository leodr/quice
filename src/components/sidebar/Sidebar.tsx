import OutlineAtSymbolIcon from "heroicons/outline/at-symbol.svg";
import OutlineInboxIcon from "heroicons/outline/inbox.svg";
import SolidPlusIcon from "heroicons/solid/plus.svg";
import SolidSearchIcon from "heroicons/solid/search.svg";
import Link from "next/link";
import React, { ChangeEvent, ReactElement, useMemo, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "src/firebase";
import { Form } from "../../types/form";
import Logo from "../Logo";
import PrimaryLink from "./PrimaryLink";
import SecondaryLink from "./SecondaryLink";
import UserMenu from "./UserMenu";

export default function Sidebar(): ReactElement {
  const [formQuery, setFormQuery] = useState("");

  const [forms, loading, error] = useCollectionData<Form>(
    firestore.collection("forms").orderBy("name"),
    { idField: "id" }
  );

  const filteredForms = useMemo(
    () =>
      forms?.filter(
        ({ name, slug }) =>
          name.toLowerCase().includes(formQuery) ||
          slug.toLowerCase().includes(formQuery)
      ),
    [formQuery, forms]
  );

  function handleFormSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setFormQuery(event.target.value.toLowerCase());
  }

  return (
    <div className="h-0 flex-1 flex flex-col overflow-y-auto border-r border-gray-200 bg-gray-100 pt-5">
      <div className="flex items-center flex-shrink-0 px-7 space-x-4">
        <Link href="/inbox">
          <a>
            <Logo className="w-8 h-8 text-rose-500" />
          </a>
        </Link>
      </div>
      <UserMenu />
      {/* Navigation */}
      <nav className="px-3 mt-6">
        <div className="space-y-1">
          <PrimaryLink href="/inbox" Icon={OutlineInboxIcon}>
            Inbox
          </PrimaryLink>
          <PrimaryLink href="/tasks" Icon={OutlineAtSymbolIcon}>
            Assigned to me
          </PrimaryLink>
        </div>
        <div className="mt-8">
          {/* Secondary navigation */}
          <h3
            className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            id="teams-headline"
          >
            Forms
          </h3>
          <div className="pl-3 my-3">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                aria-hidden="true"
              >
                <SolidSearchIcon
                  className="mr-3 h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-rose-400 focus:border-rose-400 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search"
                value={formQuery}
                onChange={handleFormSearchChange}
              />
            </div>
          </div>
          <div
            className="mt-1 space-y-1"
            role="group"
            aria-labelledby="teams-headline"
          >
            {filteredForms?.map((form) => (
              <SecondaryLink
                key={form.id}
                href={`/${form.slug}`}
                leading={
                  <span
                    className={`w-2.5 h-2.5 mr-4 bg-${form.color}-500 rounded-full`}
                    aria-hidden="true"
                  ></span>
                }
              >
                {form.name}
              </SecondaryLink>
            ))}
            <SecondaryLink
              href="/new-form"
              leading={
                <span className="w-2.5 h-2.5 mr-4 relative">
                  <SolidPlusIcon
                    className="w-6 h-6 -top-2 -left-1.5 absolute text-gray-400 mr-4"
                    aria-hidden="true"
                  />
                </span>
              }
            >
              Create new form
            </SecondaryLink>
          </div>
        </div>
      </nav>
    </div>
  );
}
