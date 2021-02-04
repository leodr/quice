import { Transition } from "@headlessui/react";
import firebase from "firebase";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { useFirestoreQuery } from "../../firebase/query";
import { useAuth } from "../../lib/auth";
import { Form } from "../../types/form";
import { MediumAtSymbolIcon } from "../icons/medium/AtSymbol";
import { MediumInboxIcon } from "../icons/medium/Inbox";
import { SmallPlusIcon } from "../icons/small/Plus";
import { Logo } from "../Logo";
import { MenuLink } from "./MenuLink";
import SecondaryLink from "./SecondaryLink";

interface SidebarProps {}

export default function Sidebar({}: SidebarProps): ReactElement {
	const { user, signout } = useAuth();
	const router = useRouter();

	const [showDropdown, setShowDropdown] = useState(false);
	const [searchString, setSearchString] = useState("");

	const forms = useFirestoreQuery<Form>(
		user ? firebase.firestore().collection("forms").orderBy("name") : null
	);

	return (
		<div className="h-0 flex-1 flex flex-col overflow-y-auto border-r border-gray-200 bg-gray-100 pt-5">
			<div className="flex items-center flex-shrink-0 px-6 space-x-4">
				<Logo className="w-8 h-8 text-rose-500" />
				<h1 className="font-extrabold tracking-tight text-2xl text-gray-700">
					Quice
				</h1>
			</div>
			{/* User account dropdown */}
			<div className="px-3 mt-6 relative inline-block text-left">
				{/* Dropdown menu toggle, controlling the show/hide state of dropdown menu. */}
				<div>
					<button
						type="button"
						className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500"
						id="options-menu"
						aria-haspopup="true"
						aria-expanded="true"
						onClick={() => setShowDropdown(!showDropdown)}
					>
						<span className="flex w-full justify-between items-center">
							<span className="flex min-w-0 items-center justify-between space-x-3">
								<img
									className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
									src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
									alt=""
								/>
								<span className="flex-1 min-w-0">
									<span className="text-gray-900 text-sm font-medium truncate">
										Jessy Schwarz
									</span>
									<br />
									<span className="text-gray-500 text-sm truncate">
										@jessyschwarz
									</span>
								</span>
							</span>
							{/* Heroicon name: selector */}
							<svg
								className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
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
					</button>
				</div>
				{/* Dropdown panel, show/hide based on dropdown state. */}
				<Transition
					show={showDropdown}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
					className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="options-menu"
				>
					<div className="py-1">
						<a
							href="#"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
							role="menuitem"
						>
							View profile
						</a>
						<a
							href="#"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
							role="menuitem"
						>
							Settings
						</a>
						<a
							href="#"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
							role="menuitem"
						>
							Notifications
						</a>
					</div>
					<div className="py-1">
						<a
							href="#"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
							role="menuitem"
						>
							Get desktop app
						</a>
						<a
							href="#"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
							role="menuitem"
						>
							Support
						</a>
					</div>
					<div className="py-1">
						<button
							onClick={() => signout()}
							className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
							role="menuitem"
						>
							Logout
						</button>
					</div>
				</Transition>
			</div>

			{/* Navigation */}
			<nav className="px-3 mt-6">
				<div className="space-y-1">
					<MenuLink href="/inbox" Icon={MediumInboxIcon}>
						Inbox
					</MenuLink>
					<MenuLink href="/tasks" Icon={MediumAtSymbolIcon}>
						Assigned to me
					</MenuLink>
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
								{/* Heroicon name: search */}
								<svg
									className="mr-3 h-4 w-4 text-gray-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<input
								type="text"
								name="search"
								id="search"
								className="focus:ring-rose-400 focus:border-rose-400 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
								placeholder="Search"
								value={searchString}
								onChange={(e) => setSearchString(e.target.value)}
							/>
						</div>
					</div>
					<div
						className="mt-1 space-y-1"
						role="group"
						aria-labelledby="teams-headline"
					>
						{forms.data
							?.filter((form) => {
								const name = form.name.toLowerCase();
								const slug = form.slug.toLowerCase();
								const query = searchString.toLowerCase();

								return name.includes(query) || slug.includes(query);
							})
							.map((form) => {
								return (
									<SecondaryLink
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
								);
							})}
						<SecondaryLink
							href="/new-form"
							leading={
								<span className="w-2.5 h-2.5 mr-4 relative">
									<SmallPlusIcon
										className="w-6 h-6 -top-2 -left-1.5 absolute text-gray-500 mr-4"
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
