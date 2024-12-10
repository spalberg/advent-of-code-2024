import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1, part2 } from "./main.ts";
import { loadInput } from "utils";

describe("day 10 example", () => {
  const inputs = [
    "89010123",
    "78121874",
    "87430965",
    "96549874",
    "45678903",
    "32019012",
    "01329801",
    "10456732",
  ];

  it("part 1", () => {
    expect(part1(inputs)).toBe(36);
  });

  it("part 2", () => {
    expect(part2(inputs)).toBe(81);
  });
});

describe("day 10 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(10))).toBe(512);
  });

  it("part 2", async () => {
    expect(part2(await loadInput(10))).toBe(1045);
  });
});
