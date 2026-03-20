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
  setDocument: (file: File) => void;
}

export const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined,
);

export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | null>(null);

  const clearDocument = useCallback(() => {
    setFile(null);
  }, []);

  const setDocument = useCallback((newFile: File) => {
    setFile(newFile);
  }, []);

  const values = useMemo(
    () => ({
      document: file,
      clearDocument,
      setDocument,
    }),
    [file, clearDocument, setDocument],
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
