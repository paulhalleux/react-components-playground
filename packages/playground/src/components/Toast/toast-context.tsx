import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { Toast, ToastProps } from "./Toast";

import styles from "./Toast.module.scss";

type ToastType = Omit<ToastProps, "onClose">;
type ToastWithIdAndTimer = ToastType & { id: number; timer: NodeJS.Timeout };

// eslint-disable-next-line
const defaultPush = (toast: ToastType) => {};

const defaultValue = {
  pushToastRef: { current: defaultPush },
};

const ToastContext = createContext(defaultValue);

type ToastProviderProps = PropsWithChildren<{
  replace?: boolean;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}>;

export function ToasterProvider({
  children,
  replace = false,
  position = "top-right",
}: ToastProviderProps) {
  const pushToastRef = useRef(defaultPush);
  return (
    <ToastContext.Provider
      value={{
        pushToastRef,
      }}
    >
      <Toasts replace={replace} position={position} />
      {children}
    </ToastContext.Provider>
  );
}

type ToastsProps = {
  replace: boolean;
  position: ToastProviderProps["position"];
};

function Toasts({ replace, position }: ToastsProps) {
  const [toasts, setToasts] = useState<ToastWithIdAndTimer[]>([]);
  const { pushToastRef } = useContext(ToastContext);

  pushToastRef.current = (toast: ToastType) => {
    const id = Date.now();
    const timer = setTimeout(
      () => setToasts((prev) => prev.filter((t) => id !== t.id)),
      toast.duration || 0,
    );
    const toastWithId = { ...toast, id: Date.now(), timer };
    setToasts((prev) => (replace ? [toastWithId] : [toastWithId, ...prev]));
  };

  const removeToast = (toast: ToastWithIdAndTimer) => {
    clearTimeout(toast.timer);
    setToasts((prev) => prev.filter((t) => toast.id !== t.id));
  };

  return (
    <div
      className={clsx(
        styles.toaster__container,
        styles[`toaster__container--${position}`],
      )}
    >
      <AnimatePresence mode={replace ? "wait" : undefined}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{
              opacity: 0,
              y: position?.startsWith("bottom") ? 10 : -10,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              !replace
                ? { opacity: 0, y: position?.startsWith("bottom") ? 10 : -10 }
                : undefined
            }
            transition={{ duration: 0.2 }}
          >
            <Toast {...toast} onClose={() => removeToast(toast)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function useToaster() {
  const { pushToastRef } = useContext(ToastContext);
  return {
    pushToast: pushToastRef.current,
  };
}
