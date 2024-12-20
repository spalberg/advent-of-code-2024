import { loadInput } from "utils";

export function part1(input: Array<string>) {
  return solve(input);
}

export function part2(input: Array<string>) {
  return solve(input, 100_000_000_000_00);
}

function solve(input: Array<string>, dp = 0) {
  let total = 0;
  for (const { xa, ya, xb, yb, xp, yp } of parseInput(input, dp)) {
    const b = (xa * yp - xp * ya) / (xa * yb - xb * ya);
    const a = (yp - b * yb) / ya;
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
      continue;
    }
    total += 3 * a + b;
  }
  return total;
}

function* parseInput(input: Array<string>, dp: number) {
  for (let i = 0; i < input.length; i += 4) {
    const buttonA = input[i].match(/Button A: X\+(\d+), Y\+(\d+)/)!;
    const buttonB = input[i + 1].match(/Button B: X\+(\d+), Y\+(\d+)/)!;
    const prize = input[i + 2].match(/Prize: X=(\d+), Y=(\d+)/)!;
    yield {
      xa: parseInt(buttonA[1], 10),
      ya: parseInt(buttonA[2], 10),
      xb: parseInt(buttonB[1], 10),
      yb: parseInt(buttonB[2], 10),
      xp: parseInt(prize[1], 10) + dp,
      yp: parseInt(prize[2], 10) + dp,
    };
  }
}

if (import.meta.main) {
  console.log(part1(await loadInput(13)));
  console.log(part2(await loadInput(13)));
}
