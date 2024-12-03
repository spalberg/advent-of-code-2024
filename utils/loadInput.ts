import { dirname, fromFileUrl, resolve } from "@std/path";
import { readLinesFromFile } from "./readLinesFromStream.ts";

export function loadInput(day: number): Promise<Array<string>> {
  const path = resolve(
    dirname(fromFileUrl(import.meta.url)),
    "..",
    "inputs",
    `${day}.txt`,
  );
  return readLinesFromFile(path);
}
