import { createContext, PropsWithChildren, useContext } from "react";

type ModalContextType = {
  onClose?: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  onClose: () => {},
});

export type ModalProviderProps = PropsWithChildren<{
  onClose?: () => void;
}>;

export function ModalProvider({ children, onClose }: ModalProviderProps) {
  return (
    <ModalContext.Provider value={{ onClose }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
