import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";
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

export function ToasterProvider({ children }: PropsWithChildren) {
  const pushToastRef = useRef(defaultPush);
  return (
    <ToastContext.Provider value={{ pushToastRef }}>
      <Toasts />
      {children}
    </ToastContext.Provider>
  );
}

function Toasts() {
  const [toasts, setToasts] = useState<ToastWithIdAndTimer[]>([]);
  const { pushToastRef } = useContext(ToastContext);

  pushToastRef.current = (toast: ToastType) => {
    const id = Date.now();
    const timer = setTimeout(
      () => setToasts((prev) => prev.filter((t) => id !== t.id)),
      toast.duration || 0,
    );
    const toastWithId = { ...toast, id: Date.now(), timer };
    setToasts((prev) => [toastWithId, ...prev]);
  };

  const removeToast = (toast: ToastWithIdAndTimer) => {
    clearTimeout(toast.timer);
    setToasts((prev) => prev.filter((t) => toast.id !== t.id));
  };

  return (
    <div className={styles.toaster__container}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
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
