"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface DocumentContextType {
  document: File | null;
  clearDocument: () => void;
  setDocument: (file: File | null) => void;
  renameDocument: (name: string) => File | null;
}

export const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined,
);

export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | null>(null);

  const clearDocument = useCallback(() => {
    setFile(null);
  }, []);

  const setDocument = useCallback((newFile: File | null) => {
    setFile(newFile);
  }, []);

  const renameDocument = (name: string) => {
    if (!file) return null;

    let fileToUpload: File;
    if (name && file instanceof Blob) {
      fileToUpload = new File([file], `${name}.pdf`, {
        type: file.type || "application/pdf",
      });
    } else {
      fileToUpload = file;
    }

    return fileToUpload;
  };

  const values = useMemo(
    () => ({
      document: file,
      renameDocument,
      clearDocument,
      setDocument,
    }),
    [file, clearDocument, setDocument, renameDocument],
  );

  return (
    <DocumentContext.Provider value={values}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (context === undefined)
    throw new Error(
      "useDocument trebuie folosit în interiorul unui DocumentProvider",
    );
  return context;
};
