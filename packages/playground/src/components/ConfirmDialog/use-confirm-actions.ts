import { useState } from "react";

type UseConfirmActionsProps = {
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
};

export function useConfirmActions({
  onClose,
  ...data
}: UseConfirmActionsProps) {
  const [confirming, setConfirming] = useState(false);
  const [canceling, setCanceling] = useState(false);

  const onConfirm = () => {
    const result = data?.onConfirm?.();
    if (result instanceof Promise) {
      setConfirming(true);
      result.then(onClose).finally(() => setConfirming(false));
    } else {
      onClose();
    }
  };

  const onCancel = () => {
    const result = data?.onCancel?.();
    if (result instanceof Promise) {
      setCanceling(true);
      result.then(onClose).finally(() => setCanceling(false));
    } else {
      onClose();
    }
  };

  return {
    confirming,
    canceling,
    onConfirm,
    onCancel,
  };
}
