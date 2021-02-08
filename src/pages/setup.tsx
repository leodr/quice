import { AnimatePresence, motion } from "framer-motion";
import SolidCheckIcon from "heroicons/solid/check.svg";
import SolidSortAscendingIcon from "heroicons/solid/sort-ascending.svg";
import SolidXIcon from "heroicons/solid/x.svg";
import { ReactNode, SyntheticEvent, useState } from "react";
import Logo from "src/components/Logo";
import Spinner from "src/components/Spinner";
import { auth, firestore } from "src/firebase";
import { PromiseStatus } from "src/types/promiseStatus";

interface FormElements extends HTMLFormControlsCollection {
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type Step = "registration" | "add-members" | "add-form";

export default function SetupPage() {
  const [step, setStep] = useState<Step>("add-members");
  const [allowedEmails, setAllowedEmails] = useState<string[]>([]);

  const [submissionState, setSubmissionState] = useState<PromiseStatus>("idle");

  async function handleLoginFormSubmit(
    event: SyntheticEvent<LoginFormElement>
  ) {
    event.preventDefault();

    const {
      email,
      password,
      firstName,
      lastName,
    } = event.currentTarget.elements;

    setSubmissionState("pending");
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email.value,
        password.value
      );

      if (!user) throw Error("User object is null.");

      await firestore.collection("users").doc(user?.uid).set({
        firstName: firstName.value,
        lastName: lastName.value,
        emailAddress: email.value,
      });

      setSubmissionState("fulfilled");
      setAllowedEmails([email.value]);
      setStep("add-members");
    } catch {
      setSubmissionState("rejected");
    }
  }

  let formContent: ReactNode;

  switch (step) {
    case "registration":
      formContent = (
        <>
          <div className="py-8 px-4 sm:px-10">
            <h2 className="text-2xl font-extrabold text-gray-800">
              Create the first account
            </h2>
            <p className="mt-2 text-gray-500">
              The account created becomes the first manager account. Managers
              can invite people to the workspace and control their roles and
              permissions.
            </p>
          </div>
          <form
            className="space-y-6 bg-gray-50 py-8 px-4 sm:px-10"
            onSubmit={handleLoginFormSubmit}
          >
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
            <div className="pt-4 border-t">
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
                    {submissionState === "pending" && (
                      <Spinner className="w-6 h-6" />
                    )}
                    {submissionState === "fulfilled" && (
                      <>
                        <SolidCheckIcon className="h-6 w-6" />
                        <span>Account created! Forwarding...</span>
                      </>
                    )}
                    {submissionState === "rejected" && (
                      <>
                        <SolidXIcon className="h-6 w-6" />
                        <span>Account creation failed.</span>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </form>
        </>
      );
      break;
    case "add-members":
      formContent = (
        <>
          <div className="bg-white py-8 px-4 sm:px-10 border-b relative">
            <h2 className="text-2xl font-extrabold text-gray-800">
              Allowlist for emails
            </h2>
          </div>
          <div className="bg-white h-72 px-4 sm:px-10 h-">
            {allowedEmails.map((allowedEmail) => (
              <div key={allowedEmail}>{allowedEmail}</div>
            ))}
          </div>

          <div className="bg-white py-8 px-4 sm:px-10 border-t border-b relative">
            <div>
              <label htmlFor="email" className="sr-only">
                Add allowed email address
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="focus:ring-rose-400 focus:border-rose-400 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                    placeholder="allowed@example.org"
                  />
                </div>
                <button className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:border-rose-400">
                  <SolidSortAscendingIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Allow</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 py-8 px-4 sm:px-10">
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
              >
                Skip
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
              >
                Continue
              </button>
            </div>
          </div>
        </>
      );
      break;
    case "add-form":
      formContent = <></>;
      break;
  }

  return (
    <>
      <div className="relative bg-gray-100 overflow-hidden min-h-screen flex items-center justify-center">
        <div
          className="hidden sm:block sm:absolute sm:inset-0"
          aria-hidden="true"
        >
          <svg
            className="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-gray-200 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
            width={364}
            height={384}
            viewBox="0 0 364 384"
            fill="none"
          >
            <defs>
              <pattern
                id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} fill="currentColor" />
              </pattern>
            </defs>
            <rect
              width={364}
              height={384}
              fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"
            />
          </svg>
        </div>
        <div className="relative pt-6 pb-16 sm:pb-24">
          <main className="mt-16 sm:mt-24">
            <div className="mx-auto max-w-7xl">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                  <div>
                    <div className="flex mb-4 lg:mb-8 sm:justify-center lg:justify-start">
                      <Logo className="w-12 h-12 text-rose-500" />
                    </div>
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-800 sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                      <span className="block">Welcome to </span>
                      <span className="text-rose-500 block">
                        Your Workspace
                      </span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      First we'll guide you through a short setup sequence. You
                      will set up an account, add members that can access this
                      workspace and create your first form!
                    </p>
                  </div>
                </div>
                <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                  <div className="bg-white shadow-md sm:shadow-2xl sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                    {formContent}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
