import { loadInput } from "utils";

export function part1(input: Array<string>) {
  const stones = parseInput(input);
  const blink25 = blink(25);
  return stones.map(blink25).reduce((a, b) => a + b);
}

export function part2(input: Array<string>) {
  const stones = parseInput(input);
  const blink75 = blink(75);
  return stones.map(blink75).reduce((a, b) => a + b);
}

function blink(times: number) {
  const cache = new Map<string, number>();
  return (stone: number) => blinkRec(stone, times, cache);
}

function blinkRec(
  stone: number,
  times: number,
  cache: Map<string, number>,
): number {
  if (times === 0) {
    return 1;
  }
  const cacheHit = cache.get(`${stone}-${times}`);
  if (cacheHit != null) {
    return cacheHit;
  }
  if (stone === 0) {
    const result = blinkRec(1, times - 1, cache);
    cache.set(`${stone}-${times}`, result);
    return result;
  }
  const str = stone.toString();
  if (str.length % 2 === 0) {
    const half = str.length / 2;
    const left = blinkRec(parseInt(str.slice(0, half), 10), times - 1, cache);
    const right = blinkRec(parseInt(str.slice(half), 10), times - 1, cache);
    const result = left + right;
    cache.set(`${stone}-${times}`, result);
    return result;
  }
  const result = blinkRec(stone * 2024, times - 1, cache);
  cache.set(`${stone}-${times}`, result);
  return result;
}

function parseInput(input: Array<string>): Array<number> {
  return input[0].split(" ").map(Number);
}

if (import.meta.main) {
  console.log(part1(await loadInput(11)));
  console.log(part2(await loadInput(11)));
}
