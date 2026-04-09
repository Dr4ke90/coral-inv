import { useDocument } from "@/contexts/DocumentContext";
import { uploadInvoicePdf } from "@/api/uploadInvoicePdf";
import { toast } from "react-toastify";

interface UseUploadInvoicePdfReturn {
  handleUploadInvoicePdf: () => Promise<any>;
}

interface UseUploadInvoicePdfProps {
  id: string;
  date: Date;
}

export const useUploadInvoicePdf = ({
  id,
  date,
}: UseUploadInvoicePdfProps): UseUploadInvoicePdfReturn => {
  const { document, renameDocument } = useDocument();

  const handleUploadInvoicePdf = async () => {
    if (!document) {
      toast.error("Nu a fost selectat niciun document!");
      return null;
    }

    const fileToUpload = renameDocument(id);

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
          pending: "Se încarcă necesarul...",
          success: "Necesarul încărcat cu succes! 👌",
          error: "Eroare la încărcarea necesarului! 🤯",
        },
      );

      return response;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  return { handleUploadInvoicePdf };
};
