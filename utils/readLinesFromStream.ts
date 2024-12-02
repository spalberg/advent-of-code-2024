import { getLines } from "./getLines.ts";

export async function readLinesFromFile(path: string): Promise<Array<string>> {
  using file = await Deno.open(path);
  return await getLines(file.readable);
}

export async function readLinesFromStdin(): Promise<Array<string> | null> {
  if (Deno.stdin.isTerminal()) return null;
  return await getLines(Deno.stdin.readable);
}

export async function readLinesFromUrl(url: string): Promise<Array<string>> {
  const response = await fetch(url);
  if (!response.ok || response.body === null) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return await getLines(response.body);
}
