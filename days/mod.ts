type PartFunction = (input: Array<string>) => number;
type Solution = { part1: PartFunction; part2: PartFunction };

const days = new Map<number, Solution>();

for (const day of [1, 2, 3, 4]) {
  days.set(day, await import(`./${day}/main.ts`));
}

export { days };
