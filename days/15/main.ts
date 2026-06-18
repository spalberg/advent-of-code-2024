import { loadInput } from "utils";

export function part1(input: Array<string>) {
  const { walls, boxes, initialRobotPosition, moves, width, height } =
    parseInput(input);
  let robotPosition = initialRobotPosition;
  //   console.log("Initial state:");
  for (const move of moves) {
    // print(robotPosition, walls, boxes, width, height);
    // console.log(`Move ${move}:`);
    const directionVector =
      directionVectors[move as unknown as keyof typeof directionVectors]!;
    const potentialNewRobotPosition = robotPosition + directionVector;
    if (walls.has(potentialNewRobotPosition)) continue;
    if (!boxes.has(potentialNewRobotPosition)) {
      robotPosition = potentialNewRobotPosition;
      continue;
    }
    for (
      let next = potentialNewRobotPosition + directionVector;
      !walls.has(next);
      next += directionVector
    ) {
      if (boxes.has(next)) {
        continue;
      }
      boxes.delete(potentialNewRobotPosition);
      boxes.add(next);
      robotPosition = potentialNewRobotPosition;
      break;
    }
  }
  //   print(robotPosition, walls, boxes, width, height);
  return boxes.values().reduce((acc, gps) => acc + gps, 0);
}

export function part2(input: Array<string>) {
  return 0;
}

function parseInput(input: Array<string>) {
  const walls = new Set<number>();
  const boxes = new Set<number>();
  let initialRobotPosition = -1;
  const delimiterIndex = input.indexOf("");
  const moves = input.slice(delimiterIndex + 1).join("");
  const map = input.slice(0, delimiterIndex);
  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    for (let x = 0; x < row.length; x++) {
      const char = row[x];
      if (char === ".") continue;
      else if (char === "#") walls.add(gpsCoordinate(x, y));
      else if (char === "O") boxes.add(gpsCoordinate(x, y));
      else if (char === "@") initialRobotPosition = gpsCoordinate(x, y);
    }
  }
  return {
    walls,
    boxes,
    initialRobotPosition,
    moves,
    width: map.length,
    height: map[0].length,
  };
}

const directionVectors = {
  "^": gpsCoordinate(0, -1),
  ">": gpsCoordinate(1, 0),
  "v": gpsCoordinate(0, 1),
  "<": gpsCoordinate(-1, 0),
};

function gpsCoordinate(x: number, y: number) {
  return 100 * y + x;
}

function print(
  robot: number,
  walls: Set<number>,
  boxes: Set<number>,
  width: number,
  height: number,
) {
  for (let y = 0; y < height; y++) {
    let row = "";
    for (let x = 0; x < width; x++) {
      const gps = gpsCoordinate(x, y);
      if (walls.has(gps)) row += "#";
      else if (boxes.has(gps)) row += "O";
      else if (robot === gps) row += "@";
      else row += ".";
    }
    console.log(row);
  }
  console.log("");
}

if (import.meta.main) {
  console.log(part1(await loadInput(15)));
  console.log(part2(await loadInput(15)));
}
