import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1, part2 } from "./main.ts";
import { loadInput } from "utils";

describe("day 2 example", () => {
  const input = [
    "7 6 4 2 1",
    "1 2 7 8 9",
    "9 7 6 2 1",
    "1 3 2 4 5",
    "8 6 4 4 1",
    "1 3 6 7 9",
  ];

  it("part 1", () => {
    expect(part1(input)).toBe(2);
  });

  it("part 2", () => {
    expect(part2(input)).toBe(4);
  });
});

describe("day 2 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(2))).toBe(421);
  });

  it("part 2", async () => {
    expect(part2(await loadInput(2))).toBe(476);
  });
});
