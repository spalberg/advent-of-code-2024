type PartFunction = (input: Array<string>) => number;
type Solution = { part1: PartFunction; part2: PartFunction };

const days: Record<string, Solution> = {};

for (const day of [1, 2]) {
  days[pad(day)] = await import(`./${pad(day)}/main.ts`);
}

export function getSolution(day: string | number): Solution | null {
  return days[pad(day)];
}

export { days };

function pad(day: string | number) {
  return day.toString().padStart(2, "0");
}
