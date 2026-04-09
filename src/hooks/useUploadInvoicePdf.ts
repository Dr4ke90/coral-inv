import { useDocument } from "@/contexts/DocumentContext";
import { uploadInvoicePdf } from "@/api/uploadInvoicePdf";
import { toast } from "react-toastify";
import { useInvoiceFormContext } from "@/contexts/InvoiceContext";

export const useUploadInvoicePdf = () => {
  const { document, renameDocument } = useDocument();
  const { methods: invoiceMethods } = useInvoiceFormContext();

  const handleUploadInvoice = async () => {
    if (!document) {
      toast.error("Nu a fost selectat niciun document!");
      return null;
    }
    const { sn, date } = invoiceMethods.getValues();

    if (!sn) {
      toast.warning(
        "Te rugăm să introduci seria facturii (S/N) pentru redenumire.",
      );
      return null;
    }

    const fileToUpload = renameDocument(sn);

    if (!fileToUpload) {
      toast.error("Eroare la procesarea fișierului.");
      return null;
    }

    const year = date
      ? new Date(date).getFullYear().toString()
      : new Date().getFullYear().toString();

    try {
      const response = await toast.promise(
        uploadInvoicePdf(fileToUpload, year),
        {
          pending: "Se încarcă factura și datele...",
          success: "Factură încărcată cu succes! 👌",
          error: "Eroare la încărcarea facturii! 🤯",
        },
      );

      return response;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  return { handleUploadInvoice };
};
