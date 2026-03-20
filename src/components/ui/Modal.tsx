"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactElement,
  ReactNode,
  useMemo,
} from "react";
import { Box, Dialog, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalContextType {
  openName: string;
  open: (name: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal.* must be used within <Modal />");
  return context;
};

export const Modal = ({ children }: { children: ReactNode }) => {
  const [openName, setOpenName] = useState("");

  const open = (name: string) => setOpenName(name);
  const closeModal = () => setOpenName("");

  const value = useMemo(() => ({ openName, open, closeModal }), [openName]);

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

// --- SUB-COMPONENTE ---

const Trigger = ({
  children,
  opens: opensWindowName,
}: {
  children: ReactElement<{ onClick?: React.MouseEventHandler }>;
  opens: string;
}) => {
  const { open } = useModal();
  return React.cloneElement(children, {
    onClick: (e) => {
      children.props.onClick?.(e);
      open(opensWindowName);
    },
  });
};

// const Close = ({
//   children,
// }: {
//   children: ReactElement<{ onClick?: React.MouseEventHandler }>;
// }) => {
//   const { closeModal } = useModal();
//   return React.cloneElement(children, {
//     onClick: (e) => {
//       children.props.onClick?.(e);
//       closeModal();
//     },
//   });
// };

const Content = ({
  children,
  name,
  maxWidth = "sm",
}: {
  children: ReactNode;
  name: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}) => {
  const { openName, closeModal } = useModal();

  const isOpen = openName === name;

  return (
    <Dialog open={isOpen} onClose={closeModal} maxWidth={maxWidth} fullWidth>
      <Box className="bg-white rounded-lg overflow-hidden">{children}</Box>
    </Dialog>
  );
};

const Header = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const { closeModal } = useModal();
  return (
    <Box className="flex flex-col justify-between px-4 pt-4 border-b border-gray-100 bg-gray-50">
      <Box className="flex w-[100%] justify-between px-4">
        <Typography
          variant="h5"
          className="text-lg font-semibold text-gray-800"
        >
          {title}
        </Typography>
        <IconButton
          onClick={closeModal}
          size="small"
          className="hover:bg-gray-100"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {children}
    </Box>
  );
};

const Body = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <Box className={`p-4 text-sm text-gray-600 ${className}`}>{children}</Box>
);

const Actions = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <Box
    className={`flex items-center justify-end gap-2 p-4 bg-gray-50 ${className}`}
  >
    {children}
  </Box>
);

Modal.Trigger = Trigger;
Modal.Header = Header;
Modal.Body = Body;
Modal.Actions = Actions;
Modal.Content = Content;
// Modal.Close = Close;

export default Modal;
