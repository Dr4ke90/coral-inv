"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface FileContextType {
  file: File | null;
  clearFileContext: () => void;
  setFileContext: (file: File | null) => void;
  renameFile: (name: string) => File | null;
}

export const FileContext = createContext<FileContextType | undefined>(
  undefined,
);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | null>(null);

  const clearFileContext = useCallback(() => {
    setFile(null);
  }, []);

  const setFileContext = useCallback((newFile: File | null) => {
    setFile(newFile);
  }, []);

  const renameFile = (name: string) => {
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
      file,
      renameFile,
      clearFileContext,
      setFileContext,
    }),
    [file, clearFileContext, setFileContext, renameFile],
  );

  return <FileContext.Provider value={values}>{children}</FileContext.Provider>;
};

export const useFile = () => {
  const context = useContext(FileContext);
  if (context === undefined)
    throw new Error("useFile trebuie folosit în interiorul unui FileProvider");
  return context;
};
