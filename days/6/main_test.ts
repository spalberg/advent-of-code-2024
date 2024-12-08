import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { part1, part2 } from "./main.ts";
import { loadInput } from "utils";

const input = [
  "....#.....",
  ".........#",
  "..........",
  "..#.......",
  ".......#..",
  "..........",
  ".#..^.....",
  "........#.",
  "#.........",
  "......#...",
];

// day 6 example ...
//   part 1 ... ok (3ms)
//   part 2 ... ok (3ms)
// day 6 example ... ok (8ms)
// day 6 solution ...
//   part 1 ... ok (133ms)
//   part 2 ... ok (54s)
// day 6 solution ... ok (54s)

describe("day 6 example", () => {
  it("part 1", () => {
    expect(part1(input)).toBe(41);
  });

  it("part 2", () => {
    expect(part2(input)).toBe(6);
  });
});

describe("day 6 solution", () => {
  it("part 1", async () => {
    expect(part1(await loadInput(6))).toBe(4826);
  });

  it("part 2", async () => {
    expect(part2(await loadInput(6))).toBe(1721);
  });
});
