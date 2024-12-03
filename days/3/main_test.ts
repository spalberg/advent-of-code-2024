import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1, part2 } from "./main.ts";
import { loadInput } from "utils";

describe("day 3 example", () => {
  it("part 1", () => {
    expect(
      part1([
        "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
      ]),
    ).toBe(161);
  });

  it("part 2", () => {
    expect(
      part2([
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
      ]),
    ).toBe(48);
  });
});

describe("day 3 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(3))).toBe(162813399);
  });

  it("part 2", async () => {
    expect(part2(await loadInput(3))).toBe(53783319);
  });
});
