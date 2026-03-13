import { ToastContainer } from "react-toastify";

const ItEquipmentLayout = ({ children }: { children: React.ReactNode }) => {
    
  return (
    <>
      <>{children}</>
      <ToastContainer position="top-right" />
    </>
  )
};

export default ItEquipmentLayout;
