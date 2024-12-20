import { Grid } from "@pal/datastructures";
import { loadInput } from "utils";

export function part1(input: Array<string>) {
  let total = 0;
  for (const region of extractRegions(input)) {
    total += region.size * calculatePerimeter(region);
  }
  return total;
}

export function part2(input: Array<string>) {
  let total = 0;
  for (const region of extractRegions(input)) {
    total += region.size * calculatePerimeter(region);
  }
  return total;
}

type Coord = { x: number; y: number };
type CoordId = string;
type Region = Set<CoordId>;

function* extractRegions(input: Array<string>): Generator<Region> {
  const grid = Grid.fromStrings(input);
  const regionsByType = new Map<string, Set<Region>>();
  function addToRegion(
    x: number,
    y: number,
    dx: number,
    dy: number,
    type: string,
    regionsOfType: Set<Region>,
  ): Region | null {
    const neighbourType = grid.at(x + dx, y + dy);
    if (neighbourType === type) {
      for (const region of regionsOfType) {
        if (region.has(coordId({ x: x + dx, y: y + dy }))) {
          region.add(coordId({ x, y }));
          return region;
        }
      }
    }
    return null;
  }
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const type = grid.at(x, y)!;
      let regionsOfType = regionsByType.get(type);
      if (regionsOfType == null) {
        regionsOfType = new Set<Region>();
        regionsByType.set(type, regionsOfType);
      }
      const leftRegion = addToRegion(x, y, -1, 0, type, regionsOfType);
      const rightRegion = addToRegion(x, y, 0, -1, type, regionsOfType);
      if (
        leftRegion != null && rightRegion != null && leftRegion !== rightRegion
      ) {
        for (const coord of rightRegion) {
          leftRegion.add(coord);
        }
        regionsOfType.delete(rightRegion);
      }
      if (leftRegion == null && rightRegion == null) {
        regionsOfType.add(new Set([coordId({ x, y })]));
      }
    }
  }
  for (const regions of regionsByType.values()) {
    yield* regions;
  }
}

function calculatePerimeter(region: Region): number {
  let perimeter = 0;
  for (const c of region) {
    const { x, y } = fromCoordId(c);
    if (region.has(coordId({ x: x - 1, y })) === false) {
      perimeter++;
    }
    if (region.has(coordId({ x: x + 1, y })) === false) {
      perimeter++;
    }
    if (region.has(coordId({ x, y: y - 1 })) === false) {
      perimeter++;
    }
    if (region.has(coordId({ x, y: y + 1 })) === false) {
      perimeter++;
    }
  }
  return perimeter;
}

function coordId(coord: Coord): CoordId {
  return `${coord.x},${coord.y}`;
}

function fromCoordId(coordId: CoordId): Coord {
  const [x, y] = coordId.split(",").map(Number);
  return { x, y };
}

if (import.meta.main) {
  console.log(part1(await loadInput(12)));
  console.log(part2(await loadInput(12)));
}
