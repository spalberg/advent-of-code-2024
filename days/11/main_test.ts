import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1, part2 } from "./main.ts";
import { loadInput } from "utils";

describe("day 11 example", () => {
  const input = ["125 17"];

  it("part 1", () => {
    expect(part1(input)).toBe(55312);
  });

  it("part 2", () => {
    expect(part2(input)).toBe(65601038650482);
  });
});

describe("day 11 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(11))).toBe(239714);
  });

  it("part 2", async () => {
    expect(part2(await loadInput(11))).toBe(284973560658514);
  });
});
