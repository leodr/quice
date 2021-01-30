import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ReactNode, SyntheticEvent, useState } from "react";
import { SmallCheckIcon } from "../components/icons/small/Check";
import { SmallXIcon } from "../components/icons/small/X";
import { Spinner } from "../components/Spinner";
import { AuthLayout } from "../layouts/AuthLayout";
import { useAuth } from "../lib/auth";
import { PromiseStatus } from "../types/promise-status";

interface FormElements extends HTMLFormControlsCollection {
	firstName: HTMLInputElement;
	lastName: HTMLInputElement;
	email: HTMLInputElement;
	password: HTMLInputElement;
}
interface LoginFormElement extends HTMLFormElement {
	readonly elements: FormElements;
}

export default function JoinPage() {
	const { signinWithGoogle, signinWithGitHub, signup } = useAuth();

	const [submissionState, setSubmissionState] = useState<PromiseStatus>("idle");

	async function handleLoginFormSubmit(
		event: SyntheticEvent<LoginFormElement>
	) {
		event.preventDefault();

		const { email, password } = event.currentTarget.elements;

		setSubmissionState("pending");
		try {
			await signup(email.value, password.value, "/app");
			setSubmissionState("fulfilled");
		} catch {
			setSubmissionState("rejected");
		}
	}

	return (
		<>
			<form className="space-y-6" onSubmit={handleLoginFormSubmit}>
				<div className="flex space-x-4">
					<div>
						<label
							htmlFor="firstName"
							className="block text-sm font-medium text-gray-700"
						>
							First name
						</label>
						<div className="mt-1">
							<input
								id="firstName"
								name="firstName"
								type="text"
								autoComplete="given-name"
								required
								className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="lastName"
							className="block text-sm font-medium text-gray-700"
						>
							Last name
						</label>
						<div className="mt-1">
							<input
								id="lastName"
								name="lastName"
								type="text"
								autoComplete="family-name"
								required
								className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
							/>
						</div>
					</div>
				</div>
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email address
					</label>
					<div className="mt-1">
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
						/>
					</div>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700"
					>
						Password
					</label>
					<div className="mt-1">
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="new-password"
							required
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
						/>
					</div>
				</div>
				<button
					type="submit"
					className="relative h-10 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
				>
					<AnimatePresence initial={false}>
						<motion.div
							key={submissionState}
							className="flex items-center justify-center space-x-2 absolute inset-0"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0 }}
							transition={{ stiffness: 200 }}
						>
							{submissionState === "idle" && "Create account"}
							{submissionState === "pending" && <Spinner className="w-6 h-6" />}
							{submissionState === "fulfilled" && (
								<>
									<SmallCheckIcon className="h-6 w-6" />
									<span>Account created! Forwarding...</span>
								</>
							)}
							{submissionState === "rejected" && (
								<>
									<SmallXIcon className="h-6 w-6" />
									<span>Account creation failed.</span>
								</>
							)}
						</motion.div>
					</AnimatePresence>
				</button>
			</form>
			<div className="mt-6">
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-300" />
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="px-2 bg-white text-gray-500">
							Or continue with
						</span>
					</div>
				</div>
				<div className="mt-6 grid grid-cols-2 gap-3">
					<div>
						<button
							type="button"
							onClick={() => {
								signinWithGoogle("/app");
							}}
							className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
						>
							<span className="sr-only">Sign in with Googles</span>
							<svg
								className="w-5 h-5"
								role="img"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
							</svg>
						</button>
					</div>
					<div>
						<button
							type="button"
							onClick={() => {
								signinWithGitHub("/app");
							}}
							className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
						>
							<span className="sr-only">Sign in with GitHub</span>
							<svg
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

JoinPage.getLayout = (page: ReactNode) => {
	return (
		<AuthLayout
			headline="Create your account"
			subheadline={
				<>
					Already have one?{" "}
					<Link href="/login">
						<a className="font-medium text-rose-600 hover:text-rose-500">
							Sign in
						</a>
					</Link>
				</>
			}
		>
			{page}
		</AuthLayout>
	);
};
