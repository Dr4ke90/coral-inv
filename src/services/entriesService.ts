import * as entryRepository from "@/repository/entriesRepo";
import * as requirementsRepot from "@/repository/requirementRepo";
import { addBatchEquipment } from "./equipmentService";
import { EquipmentType } from "@/types/equipment.type";
import { EntryType } from "@/types/entry.type";
import mongoose, { ClientSession } from "mongoose";
import { uploadFileLocally } from "@/utils/uploadFile";
import fs, { unlink } from "node:fs/promises";
import path from "node:path";

export async function readAllEntries() {
  const [entries, requirements] = await Promise.all([
    entryRepository.getAllEntries(),
    requirementsRepot.getAllRequirements(),
  ]);

  const requirementOptions = requirements.map((r) => r.id);

  const enrichedPromises = entries.map(async (entry) => {
    const dateObj = new Date(entry.date);
    const year = dateObj.getFullYear();

    const relativePath = `public/uploads/entries/${year}/${entry.sn}.pdf`;
    const absolutePath = path.resolve(relativePath);

    let pdfPreview = false;
    let pdfPath = null;

    try {
      await fs.access(absolutePath);
      pdfPreview = true;
      pdfPath = `uploads/entries/${year}/${entry.sn}.pdf`;
    } catch {
      console.log(`${entry.sn} nu exista`);
    }

    return {
      ...entry,
      rqOptions: requirementOptions,
      eqNo: entry.items.length || 0,
      pdfPreview,
      pdfPath,
    };
  });

  return await Promise.all(enrichedPromises);
}

export async function readEntryById(id: string) {
  return await entryRepository.getEntryById(id);
}

export async function addEntry(data: EntryType, session: ClientSession) {
  return await entryRepository.createEntry(data, session);
}

export async function updateEntry(id: string, payload: Partial<EntryType>) {
  return await entryRepository.updateEntryById(id, payload);
}

export async function processEntryData(body: {
  entryData: EntryType;
  itemsData: EquipmentType[];
  buffer: Buffer | undefined;
}) {
  const session = await mongoose.startSession();
  session.startTransaction();

  let savedFilePath: string | null = null;

  const year = new Date(body.entryData.date).getFullYear();

  const pathName = path.join(
    process.cwd(),
    "public",
    "uploads",
    "entries",
    String(year),
  );

  try {
    const newEntry = await addEntry(body.entryData, session);
    console.log("Datele intrarii au fost salvate cu succes!");

    await addBatchEquipment(body.itemsData, session);
    console.log("Echipamentele au fost adaugate cu succes!");

    if (body.buffer) {
      savedFilePath = await uploadFileLocally(
        body.buffer,
        pathName,
        `${body.entryData.sn}.pdf`,
      );
      console.log("Fișierul PDF a fost salvat cu succes!");
    }

    await session.commitTransaction();
    return newEntry;
  } catch (error) {
    await session.abortTransaction();

    if (savedFilePath) {
      try {
        const fullPath = path.join(process.cwd(), savedFilePath);
        await unlink(fullPath);
      } catch (unlinkError) {
        console.error("Eroare la ștergerea fișierului orfan:", unlinkError);
      }
    }

    console.error("A apărut o eroare la salvarea datelor intrarii!");
    throw error;
  } finally {
    session.endSession();
  }
}
