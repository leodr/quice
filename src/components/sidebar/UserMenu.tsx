import { Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "src/firebase";
import { useAuthState } from "src/hooks/useAuthState";
import { useDropdown } from "src/hooks/useDropdown";
import { User } from "src/types/user";

export default function UserMenu(): ReactElement {
  const router = useRouter();
  const user = useAuthState();

  const [userData] = useDocumentData<User>(
    user ? firestore.collection("users").doc(user.uid) : null,
    { idField: "id" }
  );

  const initials =
    userData && userData.firstName.charAt(0) + userData.lastName.charAt(0);

  const [showDropdown, setShowDropdown, containerProps] = useDropdown();

  async function handleSignOut() {
    await auth.signOut();
    router.push("/login");
  }

  return (
    <div
      className="px-3 mt-6 relative inline-block text-left"
      {...containerProps}
    >
      {/* Dropdown menu toggle, controlling the show/hide state of dropdown menu. */}
      <button
        type="button"
        className="group w-full text-left bg-gray-100 rounded-md px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-rose-400"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="flex w-full justify-between items-center">
          <span className="flex min-w-0 items-center justify-between space-x-3">
            <div
              className="w-10 h-10 bg-teal-200 bg-opacity-75 text-teal-700 font-bold tracking-wide rounded-full flex-shrink-0 flex items-center justify-center"
              aria-hidden="true"
            >
              {initials}
            </div>
            <span className="flex-1 min-w-0">
              <span className="text-gray-900 text-sm font-medium truncate block">
                {userData?.firstName} {userData?.lastName}
              </span>
              <span className="text-gray-500 text-sm truncate block">
                {userData?.emailAddress}
              </span>
            </span>
          </span>
          <SelectorIcon
            className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </span>
      </button>

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
          <button
            type="button"
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={() => alert("Coming Soon!")}
          >
            Edit profile
          </button>
        </div>

        <div className="py-1">
          <button
            onClick={handleSignOut}
            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Logout
          </button>
        </div>
      </Transition>
    </div>
  );
}
