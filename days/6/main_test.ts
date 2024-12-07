import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1, part2 } from "./main.ts";
import { loadInput } from "utils";

const input = [
  "....#.....",
  ".........#",
  "..........",
  "..#.......",
  ".......#..",
  "..........",
  ".#..^.....",
  "........#.",
  "#.........",
  "......#...",
];

describe("day 6 example", () => {
  it("part 1", () => {
    expect(part1(input)).toBe(41);
  });

  it.ignore("part 2", () => {
    expect(part2(input)).toBe(-1);
  });
});

describe.ignore("day 6 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(6))).toBe(-1);
  });

  it("part 2", async () => {
    expect(part2(await loadInput(6))).toBe(-1);
  });
});
