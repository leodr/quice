import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, SyntheticEvent, useState } from "react";
import { auth } from "src/firebase";
import Spinner from "../components/Spinner";
import { AuthLayout } from "../layouts/AuthLayout";
import { PromiseStatus } from "../types/promiseStatus";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function LoginPage() {
  const router = useRouter();
  const [submissionState, setSubmissionState] = useState<PromiseStatus>("idle");

  async function handleLoginFormSubmit(
    event: SyntheticEvent<LoginFormElement>
  ) {
    event.preventDefault();

    const { email, password } = event.currentTarget.elements;

    setSubmissionState("pending");

    try {
      await auth.signInWithEmailAndPassword(email.value, password.value);
      setSubmissionState("fulfilled");
      router.push("/inbox");
    } catch {
      setSubmissionState("rejected");
    }
  }

  return (
    <>
      <Head>
        <title>Login | Quice</title>
      </Head>
      <form className="space-y-6" onSubmit={handleLoginFormSubmit}>
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
              autoComplete="current-password"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="space-y-2">
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
                {submissionState === "idle" && "Sign in"}
                {submissionState === "pending" && (
                  <Spinner className="w-6 h-6" />
                )}
                {submissionState === "fulfilled" && (
                  <>
                    <CheckIcon className="h-6 w-6" />
                    <span>Sign in successful! Forwarding...</span>
                  </>
                )}
                {submissionState === "rejected" && (
                  <>
                    <XIcon className="h-6 w-6" />
                    <span>Incorrect username or password.</span>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </button>
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link href="/reset-password">
                <a className="font-medium text-rose-600 hover:text-rose-500">
                  Forgot your password?
                </a>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

LoginPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <AuthLayout
      headline="Sign in to your account"
      subheadline={
        <>
          No account yet?{" "}
          <Link href="/join">
            <a className="font-medium text-rose-600 hover:text-rose-500">
              Sign up!
            </a>
          </Link>
        </>
      }
    >
      {page}
    </AuthLayout>
  );
};
