import { dirname, fromFileUrl, resolve } from "@std/path";

export function loadInput(day: number): Array<string> {
  const path = resolve(
    dirname(fromFileUrl(import.meta.url)),
    "..",
    "inputs",
    `${day.toString().padStart(2, "0")}.txt`,
  );
  return Deno.readTextFileSync(path).split("\n");
}
