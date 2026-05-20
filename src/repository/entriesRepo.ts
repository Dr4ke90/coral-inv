import EntryModel from "@/models/entry.model";
import { EntryType } from "@/types/entry.type";
import { ClientSession } from "mongoose";

export async function getAllEntries() {
  return await EntryModel.find({});
}

export async function getEntryById(id: string) {
  return await EntryModel.findOne({ id });
}

export async function createEntry(data: EntryType, session?: ClientSession) {
  return await EntryModel.create([data], { session });
}

export async function updateEntryById(id: string, payload: Partial<EntryType>) {
  return await EntryModel.findOneAndUpdate({ id }, payload, {
    returnDocument: "after",
  });
}
