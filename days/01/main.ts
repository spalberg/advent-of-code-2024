import { zip } from "@std/collections";
import { loadInput } from "utils";

export function part1(input: Array<string>) {
  const [l, r] = parseLists(input);
  return zip(l, r).reduce(
    (acc, [a, b]) => acc + Math.abs(a - b),
    0,
  );
}

export function part2(input: Array<string>) {
  const [l, r] = parseLists(input);
  let result = 0;
  let j = 0;
  let lastDelta = 0;
  let lastNumber = -1;
  for (let i = 0; i < l.length; i += 1) {
    if (l[i] === lastNumber) {
      result += lastDelta;
      continue;
    }
    lastNumber = l[i];
    lastDelta = 0;
    for (; j < r.length; j += 1) {
      if (r[j] === l[i]) {
        lastDelta += r[j];
      } else if (r[j] > l[i]) {
        break;
      }
    }
    result += lastDelta;
  }
  return result;
}

function parseLists(input: Array<string>): [Array<number>, Array<number>] {
  const l: Array<number> = [];
  const r: Array<number> = [];
  for (const line of input) {
    const [a, b] = line.split("   ").map(Number);
    l.push(a);
    r.push(b);
  }
  return [l.toSorted(), r.toSorted()];
}

if (import.meta.main) {
  console.log(part1(loadInput(1)));
  console.log(part2(loadInput(1)));
}
