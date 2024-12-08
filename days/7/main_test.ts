import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1, part2 } from "./main.ts";
import { loadInput } from "utils";

const input = [
  "190: 10 19",
  "3267: 81 40 27",
  "83: 17 5",
  "156: 15 6",
  "7290: 6 8 6 15",
  "161011: 16 10 13",
  "192: 17 8 14",
  "21037: 9 7 18 13",
  "292: 11 6 16 20",
];

describe("day 7 example", () => {
  it("part 1", () => {
    expect(part1(input)).toBe(3749);
  });

  it("part 2", () => {
    expect(part2(input)).toBe(11387);
  });
});

describe("day 7 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(7))).toBe(7885693428401);
  });

  it("part 2", async () => {
    expect(part2(await loadInput(7))).toBe(-1);
  });
});
