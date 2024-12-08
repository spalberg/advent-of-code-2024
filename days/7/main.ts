import { loadInput } from "utils";

const add: Operator = (a, b) => a + b;
const multiply: Operator = (a, b) => a * b;
const concat: Operator = (a, b) => a * Math.pow(10, b.toString().length) + b;

export function part1(input: Array<string>) {
  return input.map(parseLine).filter(isSolvableWithOperators([add, multiply]))
    .reduce(
      (acc, { testValue }) => acc + testValue,
      0,
    );
}

export function part2(input: Array<string>) {
  return input.map(parseLine).filter(
    isSolvableWithOperators([add, multiply, concat]),
  ).reduce(
    (acc, { testValue }) => acc + testValue,
    0,
  );
}

function isSolvableWithOperators(operators: Array<Operator>) {
  function isSolvable(
    operands: Array<number>,
    testValue: number,
    index = 1,
    currentValue = operands[0],
  ): boolean {
    if (index === operands.length) {
      return currentValue === testValue;
    }
    for (const op of operators) {
      const nextValue = op(currentValue, operands[index]);
      if (nextValue > testValue) {
        continue;
      }
      if (isSolvable(operands, testValue, index + 1, nextValue)) {
        return true;
      }
    }
    return false;
  }

  return ({ operands, testValue }: Equation): boolean =>
    isSolvable(operands, testValue);
}

function parseLine(line: string): Equation {
  const [left, right] = line.split(": ");
  const testValue = Number(left);
  const operands = right.split(" ").map(Number);
  return { operands, testValue };
}

type Equation = {
  operands: Array<number>;
  testValue: number;
};

type Operator = (a: number, b: number) => number;

if (import.meta.main) {
  console.log(part1(await loadInput(7)));
  console.log(part2(await loadInput(7)));
}
