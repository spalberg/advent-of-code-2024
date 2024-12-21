import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1, part2 } from "./main.ts";
import { loadInput } from "utils";

describe("day 14 example", () => {
  const input = [
    "p=0,4 v=3,-3",
    "p=6,3 v=-1,-3",
    "p=10,3 v=-1,2",
    "p=2,0 v=2,-1",
    "p=0,0 v=1,3",
    "p=3,0 v=-2,-2",
    "p=7,6 v=-1,-3",
    "p=3,0 v=-1,-2",
    "p=9,3 v=2,3",
    "p=7,3 v=-1,2",
    "p=2,4 v=2,-3",
    "p=9,5 v=-3,-3",
  ];

  it("part 1", () => {
    expect(part1(input, 11, 7)).toBe(12);
  });
});

describe("day 14 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(14))).toBe(229839456);
  });

  it("part 2", async () => {
    expect(part2(await loadInput(14))).toBe(7138);
  });
});
