import { loadInput } from "utils";

const defaultWidth = 101;
const defaultHeight = 103;

export function part1(
  input: Array<string>,
  width = defaultWidth,
  height = defaultHeight,
) {
  const simulate100 = simulate(100, width, height);
  const positions = input.map(parseInput).map(simulate100);
  const halfWidth = Math.floor(width / 2);
  const halfHeight = Math.floor(height / 2);
  let q1 = 0, q2 = 0, q3 = 0, q4 = 0;
  for (const { x, y } of positions) {
    if (x < halfWidth && y < halfHeight) {
      q1++;
    } else if (x > halfWidth && y < halfHeight) {
      q2++;
    } else if (x < halfWidth && y > halfHeight) {
      q3++;
    } else if (x > halfWidth && y > halfHeight) {
      q4++;
    }
  }
  return q1 * q2 * q3 * q4;
}

export function part2(input: Array<string>) {
  const robots = input.map(parseInput);
  return simulateUntilUnique(robots, defaultWidth, defaultHeight);
}

type Robot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

function simulate(seconds: number, width: number, height: number) {
  return (robot: Robot) => {
    const x = (((robot.x + robot.vx * seconds) % width) + width) % width;
    const y = (((robot.y + robot.vy * seconds) % height) + height) % height;
    return { x, y };
  };
}

function simulateUntilUnique(
  robots: Array<Robot>,
  width: number,
  height: number,
) {
  outer: for (let s = 1;; s++) {
    const positions = new Set<string>();
    const simulateS = simulate(s, width, height);
    for (const robot of robots) {
      const { x, y } = simulateS(robot);
      const key = `${x},${y}`;
      if (positions.has(key)) {
        continue outer;
      }
      positions.add(key);
    }
    return s;
  }
}

function parseInput(line: string): Robot {
  const [l, r] = line.split(" v=");
  const [x, y] = l.split("=")[1].split(",").map(Number);
  const [vx, vy] = r.split(",").map(Number);
  return { x, y, vx, vy };
}

if (import.meta.main) {
  console.log(part1(await loadInput(14)));
  console.log(part2(await loadInput(14)));
}
