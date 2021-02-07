import { AnimatePresence, motion } from "framer-motion";
import SolidCheckIcon from "heroicons/solid/check.svg";
import SolidXIcon from "heroicons/solid/x.svg";
import Link from "next/link";
import { ReactNode, SyntheticEvent, useState } from "react";
import { auth } from "src/firebase";
import Spinner from "../components/Spinner";
import { AuthLayout } from "../layouts/AuthLayout";
import { PromiseStatus } from "../types/promiseStatus";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
}
interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function PasswordResetPage() {
  const [submissionState, setSubmissionState] = useState<PromiseStatus>("idle");

  async function handleLoginFormSubmit(
    event: SyntheticEvent<LoginFormElement>
  ) {
    event.preventDefault();

    const { email } = event.currentTarget.elements;

    setSubmissionState("pending");

    try {
      await auth.sendPasswordResetEmail(email.value);
      setSubmissionState("fulfilled");
    } catch {
      setSubmissionState("rejected");
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleLoginFormSubmit}>
      <p className="text-sm text-gray-500">
        Enter your user account's verified email address and we will send you a
        password reset link.
      </p>
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
      <button
        type="submit"
        disabled={submissionState === "fulfilled"}
        className="relative h-10 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 disabled:opacity-50 transition-opacity"
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
            {submissionState === "idle" && "Send password reset email"}
            {submissionState === "pending" && <Spinner className="w-6 h-6" />}
            {submissionState === "fulfilled" && (
              <>
                <SolidCheckIcon className="h-6 w-6" />
                <span>Email sent</span>
              </>
            )}
            {submissionState === "rejected" && (
              <>
                <SolidXIcon className="h-6 w-6" />
                <span>Please check your inputs.</span>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </button>
    </form>
  );
}

PasswordResetPage.getLayout = (page: ReactNode) => {
  return (
    <AuthLayout
      headline="Reset your password"
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
