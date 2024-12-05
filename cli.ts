import { colors } from "@cliffy/ansi/colors";
import { Command } from "@cliffy/command";
import { Input, Select } from "@cliffy/prompt";
import { greaterThan, parse } from "@std/semver";
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

const update = new Command()
  .description("Update to the latest version, if needed")
  .action(async () => {
    const { latest } = await fetch(`https://jsr.io/${denoJson.name}/meta.json`)
      .then(
        (res) => res.json(),
      );
    const isUpdateAvailable = greaterThan(
      parse(latest),
      parse(denoJson.version),
    );
    if (isUpdateAvailable) {
      console.log(
        colors.bold.yellow(
          `Update available: ${denoJson.version} -> ${latest}`,
        ),
      );
      console.log("Updating...");
      await new Deno.Command(Deno.execPath(), {
        args: ["run", "-r", `jsr:@aoc/2024`, "--help"],
      }).output();
      console.log(colors.bold.green("Updated successfully"));
    } else {
      console.log(colors.bold.green("Already up to date"));
    }
  });

const main = new Command()
  .name("Advent of Code - 2024")
  .version(denoJson.version)
  .description(`
    Solutions to Advent of Code 2024 by spalberg

    Source code: https://github.com/spalberg/advent-of-code-2024
  `)
  .example(
    "To list all options",
    "deno run jsr:@aoc/2024 --help",
  )
  .example(
    "To use the interactive cli",
    "deno run -RN jsr:@aoc/2024",
  )
  .example(
    "To directly execute a day with a local input file",
    "deno run -R jsr:@aoc/2024 -d 2 -i ./inputs/2.txt",
  )
  .example(
    "To directly execute a day with a remote input file",
    "deno run -RN jsr:@aoc/2024 -d 2 -i https://pastebin.com/your-input",
  )
  .example(
    "To pipe the input into the cli",
    "cat ./inputs/2.txt | deno run jsr:@aoc/2024 -d 2",
  )
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
    .command("update", update)
    .parse(Deno.args);
}
