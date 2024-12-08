import {
  type Angle,
  type Direction,
  getDirectionVector,
  turn,
} from "../direction/mod.ts";
import type { Grid } from "./grid.ts";

export class GridPosition<T> {
  #grid: Grid<T>;
  #x: number;
  #y: number;

  constructor(grid: Grid<T>, x: number, y: number) {
    if (!grid.isInBounds(x, y)) {
      throw new Error("Position is out of bounds");
    }
    this.#grid = grid;
    this.#x = x;
    this.#y = y;
  }

  static fromString<T>(grid: Grid<T>, string: string): GridPosition<T> {
    const pos = string.split(",").map(Number);
    if (pos.length !== 2) {
      throw new Error("Invalid position string");
    }
    return new GridPosition(grid, pos[0], pos[1]);
  }

  get position(): [number, number] {
    return [this.#x, this.#y];
  }

  get x(): number {
    return this.#x;
  }

  get y(): number {
    return this.#y;
  }

  get grid(): Grid<T> {
    return this.#grid;
  }

  get positionString(): string {
    return `${this.#x},${this.#y}`;
  }

  get value(): T | null {
    return this.#grid.at(this.#x, this.#y);
  }

  move(direction: Direction, steps = 1): GridPosition<T> | null {
    const [dx, dy] = getDirectionVector(direction);
    const [x, y] = [this.#x + dx * steps, this.#y + dy * steps];
    return this.#grid.isInBounds(x, y) ? this.createPosition(x, y) : null;
  }

  *moveUntil(
    direction: Direction,
    predicate: (value: T) => boolean,
  ): Generator<GridPosition<T>> {
    // deno-lint-ignore no-this-alias
    let position: GridPosition<T> = this;
    while (true) {
      const next = position.move(direction);
      if (next == null || predicate(next.value!)) {
        return;
      }
      yield position = next;
    }
  }

  createPosition(x: number, y: number): GridPosition<T> {
    return new GridPosition(this.#grid, x, y);
  }
}

export class DirectedGridPosition<T> extends GridPosition<T> {
  #direction: Direction;

  constructor(grid: Grid<T>, x: number, y: number, direction: Direction) {
    super(grid, x, y);
    this.#direction = direction;
  }

  override createPosition(x: number, y: number): GridPosition<T> {
    return new DirectedGridPosition(this.grid, x, y, this.#direction);
  }

  get direction(): Direction {
    return this.#direction;
  }

  moveInDirection(steps = 1): DirectedGridPosition<T> | null {
    return this.move(this.#direction, steps) as DirectedGridPosition<T> | null;
  }

  moveInDirectionUntil(
    predicate: (value: T) => boolean,
  ): Generator<DirectedGridPosition<T>> {
    return this.moveUntil(this.#direction, predicate) as Generator<
      DirectedGridPosition<T>
    >;
  }

  turn(angle: Angle): DirectedGridPosition<T> {
    return new DirectedGridPosition(
      this.grid,
      this.x,
      this.y,
      turn(this.#direction, angle),
    );
  }

  turnLeft(): DirectedGridPosition<T> {
    return this.turn(270);
  }

  turnRight(): DirectedGridPosition<T> {
    return this.turn(90);
  }
}
