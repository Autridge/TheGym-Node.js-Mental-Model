import { readFile } from "node:fs/promises";

async function readAndParseJSON<T = unknown>(filePath: string): Promise<T> {
  try {
    const rawData: string = await readFile(filePath);
    return JSON.parse(rawData, "utf-8") as T;
  } catch (error: unknown) {
    if (error.code === "ENOENT") {
      throw new Error(`File not found: ${filePath}`);
    }

    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in file: ${filePath}`);
    }

    throw error;
  }
}

(async () => {
  const targetFile = "./data.json";
  try {
    const data = await readAndParseJSON(targetFile);
    console.log("Parsed Data", data);
  } catch (error: any) {
    console.log("Error", error.message);
  }
})();
