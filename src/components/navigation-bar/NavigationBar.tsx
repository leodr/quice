import { Transition } from "@headlessui/react";
import Link from "next/link";
import React, { ReactElement } from "react";

interface Props {}

export default function NavigationBar({}: Props): ReactElement {
	return (
		<div className="relative max-w-7xl mx-auto px-4 sm:px-6">
			<div className="flex justify-end items-center px-4 py-6 sm:px-6 md:justify-start">
				<div className="-mr-2 -my-2 md:hidden">
					<button
						type="button"
						className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
					>
						<span className="sr-only">Open menu</span>
						{/* Heroicon name: menu */}
						<svg
							className="h-6 w-6"
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
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
				<div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
					<nav className="flex space-x-10">
						<div className="relative">
							{/* Item active: "text-gray-900", Item inactive: "text-gray-500" */}
							<button
								type="button"
								className="group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
							>
								<span>Solutions</span>
								{/*
        Heroicon name: chevron-down

        Item active: "text-gray-600", Item inactive: "text-gray-400"
      */}
								<svg
									className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
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
								show={false}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
								className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-3xl"
							>
								<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
									<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
										<a
											href="#"
											className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
										>
											<div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-rose-500 text-white sm:h-12 sm:w-12">
												{/* Heroicon name: chart-bar */}
												<svg
													className="h-6 w-6"
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
														d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-base font-medium text-gray-900">
													Analytics
												</p>
												<p className="mt-1 text-sm text-gray-500">
													Get a better understanding of where your traffic is
													coming from.
												</p>
											</div>
										</a>
										<a
											href="#"
											className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
										>
											<div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-rose-500 text-white sm:h-12 sm:w-12">
												{/* Heroicon name: cursor-click */}
												<svg
													className="h-6 w-6"
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
														d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-base font-medium text-gray-900">
													Engagement
												</p>
												<p className="mt-1 text-sm text-gray-500">
													Speak directly to your customers in a more meaningful
													way.
												</p>
											</div>
										</a>
										<a
											href="#"
											className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
										>
											<div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-rose-500 text-white sm:h-12 sm:w-12">
												{/* Heroicon name: shield-check */}
												<svg
													className="h-6 w-6"
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
														d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-base font-medium text-gray-900">
													Security
												</p>
												<p className="mt-1 text-sm text-gray-500">
													Your customers' data will be safe and secure.
												</p>
											</div>
										</a>
										<a
											href="#"
											className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
										>
											<div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-rose-500 text-white sm:h-12 sm:w-12">
												{/* Heroicon name: view-grid */}
												<svg
													className="h-6 w-6"
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
														d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-base font-medium text-gray-900">
													Integrations
												</p>
												<p className="mt-1 text-sm text-gray-500">
													Connect with third-party tools that you're already
													using.
												</p>
											</div>
										</a>
										<a
											href="#"
											className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
										>
											<div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-rose-500 text-white sm:h-12 sm:w-12">
												{/* Heroicon name: refresh */}
												<svg
													className="h-6 w-6"
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
														d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-base font-medium text-gray-900">
													Automations
												</p>
												<p className="mt-1 text-sm text-gray-500">
													Build strategic funnels that will drive your customers
													to convert
												</p>
											</div>
										</a>
										<a
											href="#"
											className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
										>
											<div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-rose-500 text-white sm:h-12 sm:w-12">
												{/* Heroicon name: document-report */}
												<svg
													className="h-6 w-6"
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
														d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-base font-medium text-gray-900">
													Reports
												</p>
												<p className="mt-1 text-sm text-gray-500">
													Get detailed reports that will help you make more
													informed decisions
												</p>
											</div>
										</a>
									</div>
									<div className="p-5 bg-gray-50 sm:p-8">
										<a
											href="#"
											className="-m-3 p-3 flow-root rounded-md hover:bg-gray-100"
										>
											<div className="flex items-center">
												<div className="text-base font-medium text-gray-900">
													Enterprise
												</div>
												<span className="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-rose-100 text-rose-800">
													New
												</span>
											</div>
											<p className="mt-1 text-sm text-gray-500">
												Empower your entire team with even more advanced tools.
											</p>
										</a>
									</div>
								</div>
							</Transition>
						</div>
						<a
							href="#"
							className="text-base font-medium text-gray-500 hover:text-gray-900"
						>
							Pricing
						</a>
						<a
							href="#"
							className="text-base font-medium text-gray-500 hover:text-gray-900"
						>
							Docs
						</a>
						<div className="relative">
							{/* Item active: "text-gray-900", Item inactive: "text-gray-500" */}
							<button
								type="button"
								className="group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
							>
								<span>More</span>
								{/*
        Heroicon name: chevron-down

        Item active: "text-gray-600", Item inactive: "text-gray-400"
      */}
								<svg
									className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
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
								show={false}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
								className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0"
							>
								<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
									<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
										<a
											href="#"
											className="-m-3 p-3 block rounded-md hover:bg-gray-50"
										>
											<p className="text-base font-medium text-gray-900">
												Help Center
											</p>
											<p className="mt-1 text-sm text-gray-500">
												Get all of your questions answered in our forums or
												contact support.
											</p>
										</a>
										<a
											href="#"
											className="-m-3 p-3 block rounded-md hover:bg-gray-50"
										>
											<p className="text-base font-medium text-gray-900">
												Guides
											</p>
											<p className="mt-1 text-sm text-gray-500">
												Learn how to maximize our platform to get the most out
												of it.
											</p>
										</a>
										<a
											href="#"
											className="-m-3 p-3 block rounded-md hover:bg-gray-50"
										>
											<p className="text-base font-medium text-gray-900">
												Events
											</p>
											<p className="mt-1 text-sm text-gray-500">
												See what meet-ups and other events we might be planning
												near you.
											</p>
										</a>
										<a
											href="#"
											className="-m-3 p-3 block rounded-md hover:bg-gray-50"
										>
											<p className="text-base font-medium text-gray-900">
												Security
											</p>
											<p className="mt-1 text-sm text-gray-500">
												Understand how we take your privacy seriously.
											</p>
										</a>
									</div>
								</div>
							</Transition>
						</div>
					</nav>
					<div className="flex items-center md:ml-12">
						<Link href="/login">
							<a className="text-base font-medium text-gray-500 hover:text-gray-900">
								Sign in
							</a>
						</Link>
						<Link href="/join">
							<a className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-rose-600 hover:bg-rose-700">
								Sign up
							</a>
						</Link>
					</div>
				</div>
			</div>
			<Transition
				show={false}
				enter="duration-200 ease-out"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="duration-100 ease-in"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
				className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
			>
				<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
					<div className="pt-5 pb-6 px-5">
						<div className="flex items-center justify-between">
							<div>
								<img
									className="h-8 w-auto"
									src="https://tailwindui.com/img/logos/workflow-mark-rose-600.svg"
									alt="Workflow"
								/>
							</div>
							<div className="-mr-2">
								<button
									type="button"
									className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
								>
									<span className="sr-only">Close menu</span>
									{/* Heroicon name: x */}
									<svg
										className="h-6 w-6"
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
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>
						<div className="mt-6">
							<nav className="grid gap-6">
								<a
									href="#"
									className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
								>
									<div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-rose-500 text-white">
										{/* Heroicon name: chart-bar */}
										<svg
											className="h-6 w-6"
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
												d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
											/>
										</svg>
									</div>
									<div className="ml-4 text-base font-medium text-gray-900">
										Analytics
									</div>
								</a>
								<a
									href="#"
									className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
								>
									<div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-rose-500 text-white">
										{/* Heroicon name: cursor-click */}
										<svg
											className="h-6 w-6"
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
												d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
											/>
										</svg>
									</div>
									<div className="ml-4 text-base font-medium text-gray-900">
										Engagement
									</div>
								</a>
								<a
									href="#"
									className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
								>
									<div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-rose-500 text-white">
										{/* Heroicon name: shield-check */}
										<svg
											className="h-6 w-6"
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
												d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
											/>
										</svg>
									</div>
									<div className="ml-4 text-base font-medium text-gray-900">
										Security
									</div>
								</a>
								<a
									href="#"
									className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
								>
									<div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-rose-500 text-white">
										{/* Heroicon name: view-grid */}
										<svg
											className="h-6 w-6"
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
												d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
											/>
										</svg>
									</div>
									<div className="ml-4 text-base font-medium text-gray-900">
										Integrations
									</div>
								</a>
								<a
									href="#"
									className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
								>
									<div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-rose-500 text-white">
										{/* Heroicon name: refresh */}
										<svg
											className="h-6 w-6"
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
												d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
											/>
										</svg>
									</div>
									<div className="ml-4 text-base font-medium text-gray-900">
										Automations
									</div>
								</a>
								<a
									href="#"
									className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
								>
									<div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-rose-500 text-white">
										{/* Heroicon name: document-report */}
										<svg
											className="h-6 w-6"
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
												d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
											/>
										</svg>
									</div>
									<div className="ml-4 text-base font-medium text-gray-900">
										Reports
									</div>
								</a>
							</nav>
						</div>
					</div>
					<div className="py-6 px-5">
						<div className="grid grid-cols-2 gap-4">
							<a
								href="#"
								className="text-base font-medium text-gray-900 hover:text-gray-700"
							>
								Pricing
							</a>
							<a
								href="#"
								className="text-base font-medium text-gray-900 hover:text-gray-700"
							>
								Docs
							</a>
							<a
								href="#"
								className="text-base font-medium text-gray-900 hover:text-gray-700"
							>
								Enterprise
							</a>
							<a
								href="#"
								className="text-base font-medium text-gray-900 hover:text-gray-700"
							>
								Blog
							</a>
							<a
								href="#"
								className="text-base font-medium text-gray-900 hover:text-gray-700"
							>
								Help Center
							</a>
							<a
								href="#"
								className="text-base font-medium text-gray-900 hover:text-gray-700"
							>
								Guides
							</a>
							<a
								href="#"
								className="text-base font-medium text-gray-900 hover:text-gray-700"
							>
								Security
							</a>
							<a
								href="#"
								className="text-base font-medium text-gray-900 hover:text-gray-700"
							>
								Events
							</a>
						</div>
						<div className="mt-6">
							<a
								href="#"
								className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-rose-600 hover:bg-rose-700"
							>
								Sign up
							</a>
							<p className="mt-6 text-center text-base font-medium text-gray-500">
								Existing customer?
								<a href="#" className="text-rose-600 hover:text-rose-500">
									Sign in
								</a>
							</p>
						</div>
					</div>
				</div>
			</Transition>
		</div>
	);
}
