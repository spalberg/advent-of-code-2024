import { loadInput } from "utils";

export function part1(input: Array<string>) {
  const { rules, updates } = parseInput(input);
  const graph = buildDependencyGraph(rules);
  return updates.filter((update) => isUpdateOrderValid(update, graph)).reduce(
    (acc, update) => acc + update[Math.floor(update.length / 2)],
    0,
  );
}

export function part2(input: Array<string>) {
  const { rules, updates } = parseInput(input);
  const graph = buildDependencyGraph(rules);
  return updates.filter((update) => !isUpdateOrderValid(update, graph))
    .map((update) => orderUpdateCorrectly(update, graph)).reduce(
      (acc, update) => acc + update[Math.floor(update.length / 2)],
      0,
    );
}

function isUpdateOrderValid(update: Array<number>, graph: DependencyGraph) {
  const visited = new Set<number>();
  for (const page of update) {
    const dependencies = graph.get(page) ?? [];
    for (const dependency of dependencies) {
      if (update.includes(dependency) && !visited.has(dependency)) {
        return false;
      }
    }
    visited.add(page);
  }
  return true;
}

function orderUpdateCorrectly(update: Array<number>, graph: DependencyGraph) {
  function compare(a: number, b: number) {
    return update.includes(b) && graph.get(a)?.has(b) ? 1 : -1;
  }
  return update.toSorted(compare);
}

type DependencyGraph = Map<number, Set<number>>;
function buildDependencyGraph(rules: Array<[number, number]>): DependencyGraph {
  const graph = new Map<number, Set<number>>();
  for (const [predecessor, dependent] of rules) {
    const set = graph.get(dependent) ?? new Set<number>();
    set.add(predecessor);
    graph.set(dependent, set);
  }
  return graph;
}

function parseInput(input: Array<string>) {
  const rules: Array<[number, number]> = [];
  const updates: Array<Array<number>> = [];
  const split = input.indexOf("");
  for (let i = 0; i < split; i++) {
    rules.push(input[i].split("|").map(Number) as [number, number]);
  }
  for (let i = split + 1; i < input.length; i++) {
    updates.push(input[i].split(",").map(Number));
  }
  return { rules, updates };
}

if (import.meta.main) {
  console.log(part1(await loadInput(5)));
  console.log(part2(await loadInput(5)));
}
