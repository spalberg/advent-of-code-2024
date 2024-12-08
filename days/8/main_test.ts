import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1, part2 } from "./main.ts";
import { loadInput } from "utils";

const input = [
  "............",
  "........0...",
  ".....0......",
  ".......0....",
  "....0.......",
  "......A.....",
  "............",
  "............",
  "........A...",
  ".........A..",
  "............",
  "............",
];

describe("day 8 example", () => {
  it("part 1", () => {
    expect(part1(input)).toBe(14);
  });

  it("part 2", () => {
    expect(part2(input)).toBe(34);
  });
});

describe("day 8 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(8))).toBe(222);
  });

  it("part 2", async () => {
    expect(part2(await loadInput(8))).toBe(884);
  });
});
