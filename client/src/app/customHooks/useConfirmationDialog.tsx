import { useState } from "react";
import ConfirmationDialog from "../components/ConfirmationDialog";


interface DialogConfig {
  title?: string;
  message?: string;
  onConfirm: () => void;
}

export const useConfirmationDialog = () => {
  const [dialogConfig, setDialogConfig] = useState<DialogConfig | null>(null);

  const openDialog = ({ title, message, onConfirm }: DialogConfig) => {
    setDialogConfig({ title, message, onConfirm });
  };

  const closeDialog = () => {
    setDialogConfig(null);
  };

  return {
    dialog: dialogConfig ? (
      <ConfirmationDialog
        isOpen={!!dialogConfig}
        title={dialogConfig.title}
        message={dialogConfig.message}
        onClose={closeDialog}
        onConfirm={() => {
          dialogConfig.onConfirm();
          closeDialog();
        }}
      />
    ) : null,
    openDialog,
  };
};
