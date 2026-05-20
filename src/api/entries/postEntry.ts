import axios from "axios";

export const postEntry = async (formData: FormData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENTRIES}`,
    formData,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  return response.data;
};
