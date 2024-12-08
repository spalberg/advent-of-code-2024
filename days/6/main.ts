import { DirectedGridPosition, Grid } from "@pal/datastructures";
import { loadInput } from "utils";

export function part1(input: Array<string>) {
  const guardPosition = parseInput(input);
  const { path } = getGuardPositions([guardPosition]);
  return new Set(path.map((pos) => pos.positionString)).size;
}

export function part2(input: Array<string>) {
  const guardPosition = parseInput(input);
  const { path } = getGuardPositions([guardPosition]);
  const obstaclePositions = new Set<string>();
  for (let i = 2; i < path.length; i++) {
    const subPath = path.slice(0, i - 1);
    if (
      path[i].value === "^" ||
      subPath.map((pos) => pos.positionString).includes(path[i].positionString)
    ) {
      continue;
    }
    const { isLoop } = getGuardPositions(
      subPath,
      (p) => p.value === "#" || (p.x === path[i].x && p.y === path[i].y),
    );
    if (isLoop) {
      obstaclePositions.add(path[i].positionString);
    }
  }
  return obstaclePositions.size;
}

function getGuardPositions(
  path: Array<DirectedGridPosition<string>>,
  isObstacle = (p: DirectedGridPosition<string>) => p.value === "#",
): { path: Array<DirectedGridPosition<string>>; isLoop: boolean } {
  if (path.length === 0) {
    throw new Error("Path must contain at least one position");
  }
  const visited = new Set(path.map((pos) => pos.toString()));
  let guardPosition = path[path.length - 1];
  while (true) {
    for (
      guardPosition of guardPosition.moveInDirectionUntil(isObstacle)
    ) {
      const positionAsString = guardPosition.toString();
      if (visited.has(positionAsString)) {
        return { path, isLoop: true };
      }
      path.push(guardPosition);
      visited.add(positionAsString);
    }
    if (guardPosition.moveInDirection() == null) {
      return { path, isLoop: false };
    }
    guardPosition = guardPosition.turnRight();
  }
}

function parseInput(input: Array<string>): DirectedGridPosition<string> {
  const grid = Grid.fromStrings(input);
  const [x, y] = grid.findFirst((value) => value === "^")!;
  return new DirectedGridPosition(grid, x, y, "up");
}

if (import.meta.main) {
  console.log(part1(await loadInput(6)));
  console.log(part2(await loadInput(6)));
}
