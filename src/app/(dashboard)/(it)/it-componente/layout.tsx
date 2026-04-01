import { DocumentProvider } from "@/contexts/DocumentContext";
import { ToastContainer } from "react-toastify";

const ItComponentsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DocumentProvider>
      <>{children}</>
      <ToastContainer position="top-right" />
    </DocumentProvider>
  );
};

export default ItComponentsLayout;
