import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1, part2 } from "./main.ts";
import { loadInput } from "utils";

describe("day 9 example", () => {
  const input = ["2333133121414131402"];

  it("part 1", () => {
    expect(part1(input)).toBe(1928);
  });

  it("part 2", () => {
    expect(part2(input)).toBe(2858);
  });
});

describe("day 9 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(9))).toBe(6279058075753);
  });

  it.ignore("part 2", async () => {
    expect(part2(await loadInput(9))).toBe(-1);
  });
});
