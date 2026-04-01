import axios, { AxiosResponse } from "axios";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

export interface TemplateData {
  id: string | number;
  [key: string]: any;
}

export const generateDocx = (
  endpointUrl: string,
  selectedObject: TemplateData,
): void => {
  axios({
    url: endpointUrl,
    method: "GET",
    responseType: "arraybuffer",
  })
    .then((response: AxiosResponse<ArrayBuffer>) => {
      const binaryData = response.data;
      processDocxTemplate(binaryData, selectedObject);
    })
    .catch((error: any) => {
      console.error("Error fetching file:", error.message || error);
    });
};

const processDocxTemplate = (
  binaryData: ArrayBuffer,
  object: TemplateData,
): void => {
  const template = new Docxtemplater();
  const buffer = new Uint8Array(binaryData);
  const zip = new PizZip(buffer);

  template.loadZip(zip);
  template.setData(object);

  try {
    template.render();
  } catch (error: any) {
    console.error("Error rendering template:", error.message || error);
  }

  const updatedBinaryData: Uint8Array = template.getZip().generate({
    type: "uint8array",
  });

  const blob = new Blob([updatedBinaryData as any], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${object.id}.docx`;
  a.click();
  URL.revokeObjectURL(url);
};
