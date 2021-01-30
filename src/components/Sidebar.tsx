import { Transition } from "@headlessui/react";
import firebase from "firebase";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { useFirestoreQuery } from "../firebase/query";
import { useAuth } from "../lib/auth";
import { Form } from "../types/form";
import { Logo } from "./Logo";

interface SidebarProps {}

export default function Sidebar({}: SidebarProps): ReactElement {
	const { user, signout } = useAuth();
	const router = useRouter();

	const [showDropdown, setShowDropdown] = useState(false);

	const forms = useFirestoreQuery<Form>(
		user
			? firebase
					.firestore()
					.collection("forms")
					.where("owner.type", "==", "user")
					.where("owner.id", "==", user.uid)
			: null
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
					{/* Current: "bg-gray-200 text-gray-900", Default: "text-gray-700 hover:text-gray-900 hover:bg-gray-50" */}
					<a
						href="#"
						className="bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
					>
						{/* Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" */}
						{/* Heroicon name: home */}
						<svg
							className="text-gray-500 mr-3 h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
							/>
						</svg>
						Home
					</a>
					<a
						href="#"
						className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
					>
						{/* Heroicon name: view-list */}
						<svg
							className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 10h16M4 14h16M4 18h16"
							/>
						</svg>
						My tasks
					</a>
					<a
						href="#"
						className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
					>
						{/* Heroicon name: clock */}
						<svg
							className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Recent
					</a>
				</div>
				{/* Sidebar Search */}
				<div className="mt-8">
					{/* Secondary navigation */}
					<div className="flex items-center justify-between">
						<h3
							className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
							id="teams-headline"
						>
							Forms
						</h3>
						<button className="h-6 w-6 rounded border text-gray-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
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
								className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
								placeholder="Search"
							/>
						</div>
					</div>
					<div
						className="mt-1 space-y-1"
						role="group"
						aria-labelledby="teams-headline"
					>
						{forms.data?.map((form) => (
							<button
								key={form.id}
								type="button"
								onClick={() => {
									router.push(`/form/${form.id}`);
								}}
								className="w-full group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
							>
								<span
									className={`w-2.5 h-2.5 mr-4 bg-${form.color}-500 rounded-full`}
									aria-hidden="true"
								/>
								<span className="truncate">{form.name}</span>
							</button>
						))}
					</div>
				</div>
			</nav>
		</div>
	);
}
