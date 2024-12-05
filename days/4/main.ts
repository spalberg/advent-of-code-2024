import { loadInput } from "utils";

export function part1(input: Array<string>) {
  const needles = ["XMAS", "SAMX"];
  let result = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const start: Pos = [x, y];
      for (const needle of needles) {
        if (checkHorizontal(start, needle, input)) {
          result++;
        }
        if (checkVertical(start, needle, input)) {
          result++;
        }
        if (checkDiagonalDown(start, needle, input)) {
          result++;
        }
        if (checkDiagonalUp(start, needle, input)) {
          result++;
        }
      }
    }
  }
  return result;
}

export function part2(input: Array<string>) {
  function at(x: number, y: number) {
    const row = input[y];
    if (row == null) return null;
    return row[x];
  }

  let result = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (at(x, y) !== "A") continue;
      if (
        (
          at(x - 1, y - 1) === "M" && at(x + 1, y + 1) === "S" ||
          at(x - 1, y - 1) === "S" && at(x + 1, y + 1) === "M"
        ) && (
          at(x + 1, y - 1) === "M" && at(x - 1, y + 1) === "S" ||
          at(x + 1, y - 1) === "S" && at(x - 1, y + 1) === "M"
        )
      ) {
        result++;
      }
    }
  }
  return result;
}

function checkHorizontal(start: Pos, needle: string, haystack: Array<string>) {
  const [x, y] = start;
  if (haystack[y].length < needle.length + x) {
    return false;
  }
  for (let i = 0; i < needle.length; i++) {
    if (haystack[y][x + i] !== needle[i]) {
      return false;
    }
  }
  return true;
}

function checkVertical(start: Pos, needle: string, haystack: Array<string>) {
  const [x, y] = start;
  if (haystack.length < needle.length + y) {
    return false;
  }
  for (let i = 0; i < needle.length; i++) {
    if (haystack[y + i][x] !== needle[i]) {
      return false;
    }
  }
  return true;
}

function checkDiagonalDown(
  start: Pos,
  needle: string,
  haystack: Array<string>,
) {
  const [x, y] = start;
  if (
    haystack.length < needle.length + y ||
    haystack[y].length < needle.length + x
  ) {
    return false;
  }
  for (let i = 0; i < needle.length; i++) {
    if (haystack[y + i][x + i] !== needle[i]) {
      return false;
    }
  }
  return true;
}

function checkDiagonalUp(start: Pos, needle: string, haystack: Array<string>) {
  const [x, y] = start;
  if (y < needle.length - 1 || haystack[y].length < needle.length + x) {
    return false;
  }
  for (let i = 0; i < needle.length; i++) {
    if (haystack[y - i][x + i] !== needle[i]) {
      return false;
    }
  }
  return true;
}

type Pos = [number, number];

if (import.meta.main) {
  console.log(part1(await loadInput(4)));
  console.log(part2(await loadInput(4)));
}
