import Modal from "@/shared/components/ui/Modal";
import { ToastContainer } from "react-toastify";

const HandoverLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Modal>{children}</Modal>
      <ToastContainer position="top-right" />
    </>
  );
};

export default HandoverLayout;
