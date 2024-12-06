import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1, part2 } from "./main.ts";
import { loadInput } from "utils";

const input = [
  "47|53",
  "97|13",
  "97|61",
  "97|47",
  "75|29",
  "61|13",
  "75|53",
  "29|13",
  "97|29",
  "53|29",
  "61|53",
  "97|53",
  "61|29",
  "47|13",
  "75|47",
  "97|75",
  "47|61",
  "75|61",
  "47|29",
  "75|13",
  "53|13",
  "",
  "75,47,61,53,29",
  "97,61,53,29,13",
  "75,29,13",
  "75,97,47,61,53",
  "61,13,29",
  "97,13,75,29,47",
];

describe("day 5 example", () => {
  it("part 1", () => {
    expect(part1(input)).toBe(143);
  });

  it("part 2", () => {
    expect(part2(input)).toBe(123);
  });
});

describe("day 5 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(5))).toBe(4774);
  });

  it("part 2", async () => {
    expect(part2(await loadInput(5))).toBe(6004);
  });
});
