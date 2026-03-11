import { ToastContainer } from "react-toastify";

const ReturnPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <>{children}</>
      <ToastContainer position="top-right" />
    </>
  );
};

export default ReturnPageLayout;
