import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1, part2 } from "./main.ts";
import { loadInput } from "utils";

describe("day 1 example", () => {
  const input = [
    "3   4",
    "4   3",
    "2   5",
    "1   3",
    "3   9",
    "3   3",
  ];

  it("part 1", () => {
    expect(part1(input)).toBe(11);
  });

  it("part 2", () => {
    expect(part2(input)).toBe(31);
  });
});

describe("day 1 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(1))).toBe(2378066);
  });

  it("part 2", async () => {
    expect(part2(await loadInput(1))).toBe(18934359);
  });
});
