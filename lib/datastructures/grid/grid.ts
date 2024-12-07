import { Vector } from "../vector/mod.ts";
import { ArrayVector } from "../vector/vector.ts";

export class Grid<T> {
  #data: Array<Array<T>>;

  private constructor(data: Array<Array<T>>) {
    this.#data = data;
    this.#validatekDimensions();
  }

  static from<T>(data: Array<Array<T>>): Grid<T> {
    return new Grid(data);
  }

  static fromStrings(strings: Array<string>): Grid<string> {
    return new Grid(strings.map((line) => line.split("")));
  }

  get height(): number {
    return this.#data.length;
  }

  get width(): number {
    return this.#data[0].length;
  }

  at(x: number, y: number): T | null {
    return this.#data[y]?.[x] ?? null;
  }

  *rows(): Generator<Vector<T>> {
    for (const row of this.#data) {
      yield ArrayVector.from(row);
    }
  }

  *columns(): Generator<Vector<T>> {
    for (let x = 0; x < this.width; x++) {
      yield new GridColumnVector(this, x);
    }
  }

  #validatekDimensions() {
    if (this.#data.length === 0) {
      throw new Error("Grid is empty");
    }
    if (this.#data.some((row) => row.length !== this.width)) {
      throw new Error("Rows have different lengths");
    }
  }
}

export class GridColumnVector<T> extends Vector<T> {
  #grid: Grid<T>;
  #x: number;

  constructor(grid: Grid<T>, x: number) {
    super();
    this.#grid = grid;
    this.#x = x;
  }

  override get length(): number {
    return this.#grid.height;
  }

  override at(index: number): T | null {
    return this.#grid.at(this.#x, index);
  }
}
