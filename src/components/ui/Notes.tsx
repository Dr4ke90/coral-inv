"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import { Save } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import { normalizeString } from "@/utils/normalizeString";

interface NotesProps {
  notes: string;
  onSave: (notes: string) => Promise<string | void>;

  title?: string;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
}

const Notes = ({
  notes: initialNotes,
  onSave,
  placeholder = "Adaugă notițe...",
  minRows = 5,
  maxRows = 15,
}: NotesProps) => {
  const [notes, setNotes] = useState(initialNotes);
  const [savedNotes, setSavedNotes] = useState(initialNotes);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const currentNotes = normalizeString(initialNotes);

    setNotes(currentNotes);
    setSavedNotes(currentNotes);
    setSaveError(null);
    setSaveSuccess(false);
  }, [initialNotes]);

  const hasChanges = normalizeString(notes) !== normalizeString(savedNotes);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value);
    setSaveSuccess(false);
    setSaveError(null);
  };

  const handleSave = async () => {
    if (!hasChanges || isSaving) {
      return;
    }

    try {
      setIsSaving(true);
      setSaveError(null);
      setSaveSuccess(false);

      const returnedNotes = await onSave(notes);

      const updatedNotes =
        typeof returnedNotes === "string" ? returnedNotes : notes;

      setNotes(updatedNotes);
      setSavedNotes(updatedNotes);
      setSaveSuccess(true);
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "A apărut o eroare la salvarea notițelor.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box className="p-2 pb-6 md:px-6">
      <TextField
        fullWidth
        multiline
        minRows={minRows}
        maxRows={maxRows}
        value={notes}
        disabled={isSaving}
        placeholder={placeholder}
        onChange={handleChange}
        helperText={
          hasChanges ? "Ai modificări nesalvate." : "Notițele sunt salvate."
        }
      />

      <Box className="mb-3 flex items-center justify-between gap-3">
        <Box className="flex items-center gap-2">
          {saveSuccess && (
            <Alert severity="success" className="mt-3">
              Notițele au fost salvate.
            </Alert>
          )}

          {saveError && (
            <Alert severity="error" className="mt-3">
              {saveError}
            </Alert>
          )}
        </Box>

        <Button
          variant="contained"
          startIcon={
            isSaving ? <CircularProgress size={18} color="inherit" /> : <Save />
          }
          disabled={!hasChanges || isSaving}
          onClick={handleSave}
        >
          {isSaving ? "Se salvează..." : "Salvează"}
        </Button>
      </Box>
    </Box>
  );
};

export default Notes;
