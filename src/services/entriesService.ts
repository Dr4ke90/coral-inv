import * as entryRepository from "@/repository/entriesRepo";
import { addBatchEquipment } from "./equipmentService";
import { EquipmentType } from "@/types/equipment.type";
import { EntryType } from "@/types/entry.type";
import mongoose from "mongoose";
import { ClientSession } from "mongoose";
import { uploadFileLocally } from "@/utils/uploadFile";
import { unlink } from "fs/promises";
import path from "path";

export async function readAllEntries() {
  return await entryRepository.getAllEntries();
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
