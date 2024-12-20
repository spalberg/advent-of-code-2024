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

  it("part 2 small example 1", () => {
    expect(part2([
      "AAAAAA",
      "AAABBA",
      "AAABBA",
      "ABBAAA",
      "ABBAAA",
      "AAAAAA",
    ])).toBe(368);
  });

  it("part 2 small example 2", () => {
    expect(part2([
      "EEEEE",
      "EXXXX",
      "EEEEE",
      "EXXXX",
      "EEEEE",
    ])).toBe(236);
  });

  it("part 2 small example 3", () => {
    expect(part2([
      "AAAA",
      "BBCD",
      "BBCC",
      "EEEC",
    ])).toBe(80);
  });
});

describe("day 12 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(12))).toBe(1467094);
  });

  it("part 2", async () => {
    expect(part2(await loadInput(12))).toBe(881182);
  });
});
