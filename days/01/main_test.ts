import { expect } from "@std/expect";
import { part1, part2 } from "./main.ts";

const input = [
  "3   4",
  "4   3",
  "2   5",
  "1   3",
  "3   9",
  "3   3",
];

Deno.test("part 1", () => {
  expect(part1(input)).toBe(11);
});

Deno.test("part 2", () => {
  expect(part2(input)).toBe(31);
});
