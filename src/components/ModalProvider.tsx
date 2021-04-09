import { Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type DialogType = "destructive";

interface DialogOptions {
  type: DialogType;
  title: string;
  text: string;
  confirmText: string;
}

type ModalContextValue = (options: DialogOptions) => Promise<boolean>;

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);

  if (ctx === null) throw Error("No ModalContext found.");

  return ctx;
}

interface Props {
  children: ReactNode;
}

type State =
  | ({
      state: "closed";
      resolveFn?: (value: boolean) => void;
    } & Partial<DialogOptions>)
  | ({
      state: "open";
      resolveFn: (value: boolean) => void;
    } & DialogOptions);

export default function ModalProvider({ children }: Props): ReactElement {
  const [dialogState, setDialogState] = useState<State>({ state: "closed" });

  const openModal = useCallback(
    ({ text, title, type, confirmText }: DialogOptions) =>
      new Promise<boolean>((resolveFn) => {
        setDialogState({
          state: "open",
          text,
          title,
          type,
          confirmText,
          resolveFn,
        });
      }),
    []
  );

  function handleClose(result: boolean) {
    dialogState.resolveFn?.(result);
    setDialogState((state) => ({ ...state, state: "closed" }));
  }

  return (
    <ModalContext.Provider value={openModal}>
      {children}
      <div className="fixed z-10 inset-0 overflow-y-auto pointer-events-none">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition
            show={dialogState.state === "open"}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="fixed inset-0 transition-opacity"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75" />
          </Transition>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            ​
          </span>

          <Transition
            show={dialogState.state === "open"}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            className="pointer-events-auto inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <ExclamationIcon
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  {dialogState.title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{dialogState.text}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 sm:col-start-2 sm:text-sm"
                onClick={() => handleClose(true)}
              >
                {dialogState.confirmText}
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 sm:mt-0 sm:col-start-1 sm:text-sm"
                onClick={() => handleClose(false)}
              >
                Cancel
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </ModalContext.Provider>
  );
}
