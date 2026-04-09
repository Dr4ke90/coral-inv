"use client";
import React, { useRef } from "react";
import { Button, Box, Typography, IconButton } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";

interface UploadDocumentButtonProps {
  className?: string;
  disabled?: boolean;
  onFileSelect?: (file: File | null) => void;
  label?: string;
  selectedFile?: File | null;
}

const UploadPdfButton = ({
  className,
  disabled = false,
  onFileSelect,
  label = "Incarca PDF",
  selectedFile,
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
      onFileSelect?.(file);
    }
    event.target.value = "";
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect?.(null);
  };

  return (
    <Box className={className}>
      <input
        type="file"
        accept="application/pdf"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <Box display="flex" flexDirection="column" gap={1}>
        <Button
          variant={selectedFile ? "outlined" : "contained"}
          color="primary"
          onClick={handleButtonClick}
          startIcon={<UploadFileIcon />}
          fullWidth
          disabled={disabled}
        >
          {selectedFile ? "Schimbă PDF" : label}
        </Button>

        {selectedFile && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={1}
          >
            <Typography
              variant="caption"
              color="textSecondary"
              noWrap
              sx={{ maxWidth: "200px" }}
            >
              {selectedFile.name}
            </Typography>
            <IconButton
              onClick={handleClear}
              size="small"
              color="error"
              disabled={disabled}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UploadPdfButton;
