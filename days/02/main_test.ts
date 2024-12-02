import { expect } from "@std/expect";
import { part1, part2 } from "./main.ts";

const input = [
  "7 6 4 2 1",
  "1 2 7 8 9",
  "9 7 6 2 1",
  "1 3 2 4 5",
  "8 6 4 4 1",
  "1 3 6 7 9",
];

Deno.test("part 1", () => {
  expect(part1(input)).toBe(2);
});

Deno.test("part 2", () => {
  expect(part2(input)).toBe(4);
});
