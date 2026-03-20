"use client";
import React, { useRef } from "react";
import { Button, Box } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface UploadDocumentButtonProps {
  className?: string;
  disabled?: boolean;
  onFileSelect?: (file: File) => void;
  label?: string;
}

const UploadPdfButton = ({
  className,
  disabled = false,
  onFileSelect,
  label = "Incarca PDF",
}: UploadDocumentButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.type !== "application/pdf") {
        alert("Te rugăm să încarci doar documente PDF.");
        return;
      }

      if (onFileSelect) {
        onFileSelect(file);
      }

      event.target.value = "";
    }
  };

  return (
    <Box display="flex" gap={2} alignItems="center" className={className}>
      <input
        type="file"
        accept="application/pdf"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        startIcon={<UploadFileIcon />}
        fullWidth
        disabled={disabled}
      >
        {label}
      </Button>
    </Box>
  );
};

export default UploadPdfButton;
