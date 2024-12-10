import { Grid } from "@pal/datastructures";
import { loadInput } from "utils";

export function part1(input: Array<string>) {
  const grid = Grid.from(input.map((line) => line.split("").map(Number)));
  let totalScore = 0;
  for (const [x, y] of grid.findAll((n) => n === 0)) {
    totalScore += calculateTrailScore(grid, 0, x, y).size;
  }
  return totalScore;
}

export function part2(input: Array<string>) {
  const grid = Grid.from(input.map((line) => line.split("").map(Number)));
  let totalRating = 0;
  for (const [x, y] of grid.findAll((n) => n === 0)) {
    totalRating += calculateTrailRating(grid, 0, x, y);
  }
  return totalRating;
}

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
] as const;

function calculateTrailScore(
  grid: Grid<number>,
  currentValue: number,
  x: number,
  y: number,
  peaks = new Set<string>(),
) {
  if (currentValue === 9) {
    return peaks.add(`${x},${y}`);
  }
  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;
    const nextValue = grid.at(nx, ny);
    if (nextValue === currentValue + 1) {
      calculateTrailScore(grid, nextValue, nx, ny, peaks);
    }
  }
  return peaks;
}

function calculateTrailRating(
  grid: Grid<number>,
  currentValue: number,
  x: number,
  y: number,
): number {
  if (currentValue === 9) {
    return 1;
  }
  let rating = 0;
  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;
    const nextValue = grid.at(nx, ny);
    if (nextValue === currentValue + 1) {
      rating += calculateTrailRating(grid, nextValue, nx, ny);
    }
  }
  return rating;
}

if (import.meta.main) {
  console.log(part1(await loadInput(10)));
  console.log(part2(await loadInput(10)));
}
