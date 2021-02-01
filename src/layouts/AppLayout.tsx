import { Transition } from "@headlessui/react";
import { ReactNode, useState } from "react";
import { MediumMenuIcon } from "../components/icons/medium/Menu";
import { MediumXIcon } from "../components/icons/medium/X";
import { Logo } from "../components/Logo";
import Sidebar from "../components/sidebar/Sidebar";

interface AppLayoutProps {
	children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
	const [showDrawer, setShowDrawer] = useState(false);

	return (
		<div className="h-screen flex overflow-hidden bg-white">
			{/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
			<div className="lg:hidden">
				<Transition show={showDrawer} className="fixed inset-0 flex z-40">
					<Transition.Child
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						className="fixed inset-0"
					>
						{/* eslint-disable-next-line -- Is not accessible, but doesn't have to, since there is a dedicated close button. */}
						<div
							className="absolute inset-0 bg-gray-600 opacity-75"
							onClick={() => setShowDrawer(false)}
						/>
					</Transition.Child>

					<Transition.Child
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
						tabIndex={0}
						className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none"
					>
						<div className="absolute top-0 right-0 -mr-12 pt-2">
							<button
								type="button"
								onClick={() => setShowDrawer(false)}
								className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							>
								<span className="sr-only">Close sidebar</span>
								<MediumXIcon
									className="h-6 w-6 text-white"
									aria-hidden="true"
								/>
							</button>
						</div>
						<Sidebar />
					</Transition.Child>
					<div className="flex-shrink-0 w-14" aria-hidden="true">
						{/* Force sidebar to shrink to fit close icon */}
					</div>
				</Transition>
			</div>
			{/* Static sidebar for desktop */}
			<div className="hidden lg:flex lg:flex-shrink-0">
				<div className="flex flex-col w-64">
					<Sidebar />
				</div>
			</div>
			<div className="flex flex-col min-w-0 flex-1 overflow-hidden">
				<div className="lg:hidden">
					<div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
						<div>
							<Logo className="h-8 w-auto" />
						</div>
						<div>
							<button
								type="button"
								onClick={() => setShowDrawer(true)}
								className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
							>
								<span className="sr-only">Open sidebar</span>
								<MediumMenuIcon className="h-6 w-6" aria-hidden="true" />
							</button>
						</div>
					</div>
				</div>
				<div className="flex-1 relative z-0 flex overflow-hidden">
					{children}
				</div>
			</div>
		</div>
	);
}
