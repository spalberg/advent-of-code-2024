export type SimpleDirection =
  | "up"
  | "down"
  | "left"
  | "right";

export function getSimpleDirectionVector(
  direction: SimpleDirection,
): [number, number] {
  switch (direction) {
    case "up":
      return [0, -1];
    case "down":
      return [0, 1];
    case "left":
      return [-1, 0];
    case "right":
      return [1, 0];
  }
}

export type Direction =
  | SimpleDirection
  | "up-left"
  | "up-right"
  | "down-left"
  | "down-right";

const directions = [
  "up",
  "up-right",
  "right",
  "down-right",
  "down",
  "down-left",
  "left",
  "up-left",
] satisfies Array<Direction>;

const directionsLookup = Object.fromEntries(
  directions.map((dir, i) => [dir, i]),
) as Record<Direction, number>;

export function getDirectionVector(direction: Direction): [number, number] {
  switch (direction) {
    case "up-left":
      return [-1, -1];
    case "up-right":
      return [1, -1];
    case "down-left":
      return [-1, 1];
    case "down-right":
      return [1, 1];
  }
  return getSimpleDirectionVector(direction);
}

export type Angle = 45 | 90 | 135 | 180 | 225 | 270 | 315 | 360;

export function turn(direction: Direction, angle: Angle): Direction {
  const newIndex = (directionsLookup[direction] + angle / 45) %
    directions.length;
  return directions[newIndex];
}
