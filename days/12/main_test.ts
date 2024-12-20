import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1, part2 } from "./main.ts";
import { loadInput } from "utils";

describe("day 12 example", () => {
  const input = [
    "RRRRIICCFF",
    "RRRRIICCCF",
    "VVRRRCCFFF",
    "VVRCCCJFFF",
    "VVVVCJJCFE",
    "VVIVCCJJEE",
    "VVIIICJJEE",
    "MIIIIIJJEE",
    "MIIISIJEEE",
    "MMMISSJEEE",
  ];

  it("part 1", () => {
    expect(part1(input)).toBe(1930);
  });

  it("part 2", () => {
    expect(part2(input)).toBe(1206);
  });
});

describe("day 12 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(12))).toBe(1467094);
  });

  it.ignore("part 2", async () => {
    expect(part2(await loadInput(12))).toBe(-1);
  });
});
