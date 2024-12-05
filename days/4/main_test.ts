import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1, part2 } from "./main.ts";
import { loadInput } from "utils";

const example = [
  "MMMSXXMASM",
  "MSAMXMSMSA",
  "AMXSXMAAMM",
  "MSAMASMSMX",
  "XMASAMXAMM",
  "XXAMMXXAMA",
  "SMSMSASXSS",
  "SAXAMASAAA",
  "MAMMMXMMMM",
  "MXMXAXMASX",
];

describe("day 4 example", () => {
  it("part 1", () => {
    expect(part1(example)).toBe(18);
  });

  it("part 2", () => {
    expect(part2(example)).toBe(9);
  });
});

describe("day 4 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(4))).toBe(2434);
  });

  it("part 2", async () => {
    expect(part2(await loadInput(4))).toBe(1835);
  });
});
