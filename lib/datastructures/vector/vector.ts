export class Vector<T> {
  #data: Array<T>;
  #start: number;
  #end: number;

  constructor(
    data: Array<T>,
    start: number = 0,
    end: number = data.length,
  ) {
    this.#data = data;
    this.#start = start;
    this.#end = end;
  }

  static fromString(data: string): Vector<string> {
    return new Vector(data.split(""));
  }

  get length(): number {
    return this.#end - this.#start;
  }

  at(index: number): T | null {
    return this.#data[this.#start + index] ?? null;
  }

  equals(other: Vector<T>): boolean {
    if (this.length !== other.length) {
      return false;
    }
    for (let i = 0; i < this.length; i++) {
      if (this.at(i) !== other.at(i)) {
        return false;
      }
    }
    return true;
  }
}
