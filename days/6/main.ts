import { DirectedGridPosition, Grid } from "@pal/datastructures";
import { loadInput } from "utils";

export function part1(input: Array<string>) {
  const guardPosition = parseInput(input);
  const visited = getDistinctGuardPositions(guardPosition);
  return visited.size;
}

export function part2(input: Array<string>) {
  const guardPosition = parseInput(input);
  const obstaclePositions = getLoopInducingObstaclePositions(guardPosition);
  return obstaclePositions.size;
}

function getDistinctGuardPositions(
  initialGuardPosition: DirectedGridPosition<string>,
) {
  return getGuardPositions(
    initialGuardPosition,
    new Set(),
    (pos) => pos.positionString,
    false,
  )[0];
}

function getLoopInducingObstaclePositions(
  initialGuardPosition: DirectedGridPosition<string>,
): Set<string> {
  const obstaclePosition = new Set<string>();
  const visited = new Set<string>();
  const positionIdGenerator = (pos: DirectedGridPosition<string>) =>
    `${pos.positionString} ${pos.direction}`;
  let guardPosition = initialGuardPosition;
  visited.add(positionIdGenerator(guardPosition));
  while (true) {
    for (
      guardPosition of guardPosition.moveInDirectionUntil((v) => v === "#")
    ) {
      visited.add(positionIdGenerator(guardPosition));
      const potentialObstaclePosition = guardPosition.moveInDirection();
      if (potentialObstaclePosition != null) {
        const lastPosition = getGuardPositions(
          guardPosition.turnRight(),
          new Set(visited),
          positionIdGenerator,
          true,
        )[1];
        if (lastPosition.moveInDirection() != null) {
          obstaclePosition.add(potentialObstaclePosition.positionString);
        }
      }
    }
    if (guardPosition.moveInDirection() == null) return obstaclePosition;
    guardPosition = guardPosition.turnRight();
  }
}

function getGuardPositions(
  initialGuardPosition: DirectedGridPosition<string>,
  visited: Set<string>,
  positionIdGenerator: (position: DirectedGridPosition<string>) => string,
  breakOnAlreadyVisited: boolean,
): [Set<string>, DirectedGridPosition<string>] {
  let guardPosition = initialGuardPosition;
  visited.add(guardPosition.positionString);
  while (true) {
    for (
      guardPosition of guardPosition.moveInDirectionUntil((v) => v === "#")
    ) {
      if (
        breakOnAlreadyVisited && visited.has(positionIdGenerator(guardPosition))
      ) {
        return [visited, guardPosition];
      }
      visited.add(positionIdGenerator(guardPosition));
    }
    if (guardPosition.moveInDirection() == null) {
      return [visited, guardPosition];
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
