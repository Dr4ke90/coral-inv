import { FileProvider } from "@/contexts/FileContext";
import { ToastContainer } from "react-toastify";

const EntriesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <FileProvider>
      <>{children}</>
      <ToastContainer position="top-right" />
    </FileProvider>
  );
};

export default EntriesLayout;
