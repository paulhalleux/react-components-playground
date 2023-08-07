import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

import { ConfirmData, ConfirmDialog } from "./ConfirmDialog";

const defaultValue = {
  // eslint-disable-next-line
  confirm: (data: ConfirmData) => {},
};

export const ConfirmContext = createContext(defaultValue);

export type ConfirmProviderProps = PropsWithChildren;

export function ConfirmProvider({ children }: ConfirmProviderProps) {
  const [confirmData, setConfirmData] = useState<ConfirmData>();

  const confirm = useCallback((data: ConfirmData) => setConfirmData(data), []);

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      <ConfirmDialog
        data={confirmData}
        onClose={() => setConfirmData(undefined)}
      />
      {children}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmContext);
}
