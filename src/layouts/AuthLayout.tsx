import { ReactElement, ReactNode } from "react";
import Logo from "../components/Logo";

interface Props {
  headline: string;
  subheadline: ReactNode;
  children: ReactNode;
}

export function AuthLayout({
  children,
  headline,
  subheadline,
}: Props): ReactElement {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo className="h-12 w-12 text-rose-500 mx-auto" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {headline}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          {subheadline}
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
