import axios from "axios";

export const uploadPdfInvoice = async (file: File, year: string) => {
  
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_INVOICE}?year=${year}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return data;
};
