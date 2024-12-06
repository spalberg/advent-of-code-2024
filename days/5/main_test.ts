import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1, part2 } from "./main.ts";
import { loadInput } from "utils";

describe("day 5 example", () => {
  it("part 1", () => {
    expect(part1([])).toBe(-1);
  });

  it.ignore("part 2", () => {
    expect(part2([])).toBe(-1);
  });
});

describe.ignore("day 5 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(5))).toBe(-1);
  });

  it("part 2", async () => {
    expect(part2(await loadInput(5))).toBe(-1);
  });
});
