import { colors } from "@cliffy/ansi/colors";
import { Command } from "@cliffy/command";
import { Input, Select } from "@cliffy/prompt";
import { readLinesFromFile } from "utils";
import { days } from "./days/mod.ts";
import denoJson from "./deno.json" with { type: "json" };
import {
  readLinesFromStdin,
  readLinesFromUrl,
} from "./utils/readLinesFromStream.ts";

const list = new Command()
  .description("List all available solutions")
  .action(() => {
    console.log("Available solutions:");
    for (const day of days.keys()) {
      console.log(`- ${day}`);
    }
  });

const main = new Command()
  .name("Advent of Code - 2024")
  .version(denoJson.version)
  .description("...")
  .option("-d, --day <day:number>", "Day to run")
  .option("-i, --input <input:file>", "Input file, local path or remote URL")
  .action(async (options) => {
    let input: Array<string> | null = null;
    let stdinClosed = false;
    if (options.input != null) {
      input = await loadInput(options.input);
    } else {
      input = await readLinesFromStdin();
      stdinClosed = input != null;
      input = input ?? await provideInput().then(loadInput);
    }
    if (input === null) {
      console.error("No input provided");
      Deno.exit(1);
    }
    if (stdinClosed && options.day == null) {
      console.error("Day not provided");
      Deno.exit(1);
    }
    const day = options.day ?? await selectDay();
    const solution = days.get(day);
    if (solution == null) {
      console.error(`Day ${day} not found`);
      Deno.exit(1);
    }
    console.log(colors.bold.yellow(`Day ${day}`));
    console.log(`Part 1: ${solution.part1(input)}`);
    console.log(`Part 2: ${solution.part2(input)}`);
  });

async function provideInput(): Promise<string> {
  return await Input.prompt({
    message: "Provide input (path or URL)",
    files: true,
  });
}

async function selectDay(): Promise<number> {
  return await Select.prompt({
    message: "Select day",
    options: [...days.keys()].map((day) => ({
      name: day.toString(),
      value: day,
    })),
  });
}

async function loadInput(input: string) {
  return isWebUrl(input)
    ? await readLinesFromUrl(input)
    : await readLinesFromFile(input);
}

function isWebUrl(path: string): boolean {
  return path.startsWith("http://") || path.startsWith("https://");
}

if (import.meta.main) {
  await main
    .command("list", list)
    .parse(Deno.args);
}
