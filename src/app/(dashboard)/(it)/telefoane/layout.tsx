import { DocumentProvider } from "@/contexts/FileContext";
import { ToastContainer } from "react-toastify";

const PhonesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DocumentProvider>
      <>{children}</>
      <ToastContainer position="top-right" />
    </DocumentProvider>
  );
};

export default PhonesLayout;
