import { XIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

interface Snackbar {
  id: number;
  text: string;
  undo?: () => void;
}

let snackbarId = 0;

const SnackbarContext = createContext<
  ((text: string, undo?: () => void) => void) | null
>(null);

export default function SnackbarProvider({ children }: Props): ReactElement {
  const [snackbars, setSnackbars] = useState<Snackbar[]>([]);

  function showSnackBar(text: string, undo?: () => void) {
    const id = ++snackbarId;

    setSnackbars((snackbars) => [...snackbars, { id, text, undo }]);

    setTimeout(() => {
      setSnackbars((snackbars) =>
        snackbars.filter((snackbar) => snackbar.id !== id)
      );
    }, 3000);
  }

  return (
    <SnackbarContext.Provider value={showSnackBar}>
      {children}
      <AnimatePresence>
        {snackbars.map((snackbar) => (
          <motion.div
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            exit={{ y: 150 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 200,
            }}
            className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5"
            key={snackbar.id}
          >
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="p-2 rounded-lg bg-rose-500 shadow-lg sm:p-3">
                <div className="flex items-center justify-between flex-wrap">
                  <div className="w-0 flex-1 flex items-center">
                    <p className="ml-3 font-medium text-white truncate">
                      {snackbar.text}
                    </p>
                  </div>
                  {snackbar.undo && (
                    <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                      <button
                        type="button"
                        className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-rose-500 bg-white hover:bg-rose-50"
                        onClick={() => snackbar.undo?.()}
                      >
                        &qout;Undo&qout;
                      </button>
                    </div>
                  )}
                  <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                    <button
                      type="button"
                      className="-mr-1 flex p-2 rounded-md hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() =>
                        setSnackbars((snackbars) =>
                          snackbars.filter((bar) => bar.id !== snackbar.id)
                        )
                      }
                    >
                      <span className="sr-only">Dismiss</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </SnackbarContext.Provider>
  );
}

export function useSnack() {
  const showSnackbar = useContext(SnackbarContext);

  if (!showSnackbar) throw Error("SnackbarContext not found.");

  return showSnackbar;
}
