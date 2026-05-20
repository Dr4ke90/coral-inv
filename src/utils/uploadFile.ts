import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function uploadFileLocally(
  buffer: Buffer,
  pathName: string,
  fileName: string,
): Promise<string> {
  await mkdir(pathName, { recursive: true });

  const filePath = path.join(pathName, fileName);

  await writeFile(filePath, buffer);

  return `${pathName}/${fileName}`;
}
