import { loadInput } from "utils";
import { DirectedGridPosition, Grid } from "@pal/datastructures";

export function part1(input: Array<string>) {
  const grid = Grid.fromStrings(input);
  const intialGuardPosition = grid.findFirst((value) => value === "^")!;
  const guardPosition = new DirectedGridPosition(
    grid,
    intialGuardPosition[0],
    intialGuardPosition[1],
    "up",
  );
  const visited = getDistinctGuardPositions(guardPosition);
  return visited.size;
}

export function part2(_input: Array<string>) {
  return 0;
}

function getDistinctGuardPositions(
  initialGuardPosition: DirectedGridPosition<string>,
): Set<string> {
  const visited = new Set<string>();
  let guardPosition = initialGuardPosition;
  visited.add(guardPosition.positionString);
  while (true) {
    for (
      guardPosition of guardPosition.moveInDirectionUntil((v) => v === "#")
    ) {
      visited.add(guardPosition.positionString);
    }
    if (guardPosition.moveInDirection() == null) return visited;
    guardPosition = guardPosition.turnRight();
  }
}

if (import.meta.main) {
  console.log(part1(await loadInput(6)));
  console.log(part2(await loadInput(6)));
}
