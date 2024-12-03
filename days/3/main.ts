import { loadInput } from "utils";

type Mul = readonly [number, number];

export function part1(input: Array<string>) {
  return [...getAllMuls(input.join("|"))].map(([a, b]) => a * b).reduce(
    (acc, n) => acc + n,
    0,
  );
}

export function part2(input: Array<string>) {
  return [...getAllConditionalMuls(input.join("|"))].map(([a, b]) => a * b)
    .reduce(
      (acc, n) => acc + n,
      0,
    );
}

function matchMul(input: string): [Mul, string, number] | null {
  const match = input.match(/mul\((\d{1,3}),(\d{1,3})\)/);
  if (match == null) return null;
  const remaining = input.slice(match.index! + match[0].length);
  return [
    [parseInt(match[1], 10), parseInt(match[2], 10)],
    remaining,
    match.index!,
  ];
}

function* getAllMuls(input: string) {
  let remaining = input;
  while (true) {
    const match = matchMul(remaining);
    if (match == null) {
      break;
    }
    yield match[0];
    remaining = match[1];
  }
}

function* getAllConditionalMuls(input: string) {
  const doables = input.split("do()");
  for (let doable of doables) {
    const indexOfDont = doable.indexOf("don't()");
    if (indexOfDont !== -1) {
      doable = doable.slice(0, indexOfDont);
    }
    for (const mul of getAllMuls(doable)) {
      yield mul;
    }
  }
}

if (import.meta.main) {
  console.log(part1(await loadInput(3)));
  console.log(part2(await loadInput(3)));
}
