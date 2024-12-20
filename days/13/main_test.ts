import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1, part2 } from "./main.ts";
import { loadInput } from "utils";

describe("day 13 example", () => {
  const input = [
    "Button A: X+94, Y+34",
    "Button B: X+22, Y+67",
    "Prize: X=8400, Y=5400",
    "",
    "Button A: X+26, Y+66",
    "Button B: X+67, Y+21",
    "Prize: X=12748, Y=12176",
    "",
    "Button A: X+17, Y+86",
    "Button B: X+84, Y+37",
    "Prize: X=7870, Y=6450",
    "",
    "Button A: X+69, Y+23",
    "Button B: X+27, Y+71",
    "Prize: X=18641, Y=10279",
  ];

  it("part 1", () => {
    expect(part1(input)).toBe(480);
  });

  it("part 2", () => {
    expect(part2(input)).toBe(875318608908);
  });
});

describe("day 13 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(13))).toBe(37680);
  });

  it("part 2", async () => {
    expect(part2(await loadInput(13))).toBe(87550094242995);
  });
});
