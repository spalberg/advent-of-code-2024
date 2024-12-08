import { Grid, Vec } from "@pal/datastructures";
import { loadInput } from "utils";

export function part1(input: Array<string>) {
  const grid = Grid.fromStrings(input);
  return getUniqueAntiNodes(grid, (a, b, antiNodes) => {
    const displacement = b.sub(a);
    addIfInBounds(a.add(displacement.mul(-1)), antiNodes, grid);
    addIfInBounds(b.add(displacement), antiNodes, grid);
  });
}

export function part2(input: Array<string>) {
  const grid = Grid.fromStrings(input);
  return getUniqueAntiNodes(grid, (a, b, antiNodes) => {
    const displacement = b.sub(a);
    let cur = a;
    while (
      addIfInBounds(cur = cur.add(displacement.mul(-1)), antiNodes, grid)
    ) {}
    cur = a;
    while (addIfInBounds(cur = cur.add(displacement), antiNodes, grid)) {}
    antiNodes.push(a);
  });
}

function addIfInBounds(
  v: Vec,
  antiNodes: Array<Vec>,
  grid: Grid<string>,
): boolean {
  if (grid.isInBounds(v.x, v.y)) {
    antiNodes.push(v);
    return true;
  }
  return false;
}

function getUniqueAntiNodes(
  grid: Grid<string>,
  placementStrategy: (a: Vec, b: Vec, antiNodes: Array<Vec>) => void,
): number {
  const antennaTypes = getAntennaTypes(grid);
  const antiNodes: Array<Vec> = [];
  for (const antennaType of antennaTypes) {
    const antennas = grid.findAll((v) => v === antennaType);
    for (let i = 0; i < antennas.length; i++) {
      const a = Vec.of(antennas[i]);
      for (let j = i + 1; j < antennas.length; j++) {
        const b = Vec.of(antennas[j]);
        placementStrategy(a, b, antiNodes);
      }
    }
  }
  return new Set(antiNodes.map((an) => an.toString())).size;
}

function getAntennaTypes(grid: Grid<string>) {
  const antennaTypes = new Set<string>();
  for (const row of grid.rows()) {
    for (const cell of row) {
      if (cell !== ".") {
        antennaTypes.add(cell);
      }
    }
  }
  return antennaTypes;
}

if (import.meta.main) {
  console.log(part1(await loadInput(8)));
  console.log(part2(await loadInput(8)));
}
