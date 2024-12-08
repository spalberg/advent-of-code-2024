export abstract class Vector<T> {
  static from<T>(data: Array<T>): Vector<T> {
    return new ArrayVector(data);
  }

  static fromString(data: string): Vector<string> {
    return new ArrayVector(data.split(""));
  }

  abstract get length(): number;

  abstract at(index: number): T | null;

  toString(joinStr = ","): string {
    const values = [...this].join(joinStr);
    return `[${values}]`;
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

  indexOf(value: T | Vector<T>): number {
    if (value instanceof Vector) {
      return this.#indexOfVector(value);
    }
    return this.#indexOfValue(value);
  }

  contains(value: T | Vector<T>): boolean {
    return this.indexOf(value) !== -1;
  }

  subvector(startIndex: number, length: number): Vector<T> {
    if (startIndex < 0 || length < 0 || startIndex + length > this.length) {
      throw new RangeError("Invalid startIndex or length");
    }
    return new SubVector(this, startIndex, length);
  }

  *[Symbol.iterator](): Generator<T> {
    for (let i = 0; i < this.length; i++) {
      yield this.at(i)!;
    }
  }

  [Symbol.toStringTag]: string = "Vector";

  #indexOfValue(value: T): number {
    for (let i = 0; i < this.length; i++) {
      if (this.at(i) === value) {
        return i;
      }
    }
    return -1;
  }

  #indexOfVector(vector: Vector<T>): number {
    if (this.length < vector.length) {
      return -1;
    }
    for (let i = 0; i < this.length - vector.length; i++) {
      let found = true;
      for (let j = 0; j < vector.length; j++) {
        if (this.at(i + j) !== vector.at(j)) {
          found = false;
          break;
        }
      }
      if (found) {
        return i;
      }
    }
    return -1;
  }
}

export class ArrayVector<T> extends Vector<T> {
  #data: Array<T>;

  constructor(data: Array<T>) {
    super();
    this.#data = data;
  }

  override get length(): number {
    return this.#data.length;
  }

  override at(index: number): T | null {
    return this.#data[index] ?? null;
  }
}

export class SubVector<T> extends Vector<T> {
  #vector: Vector<T>;
  startIndex: number;
  #length: number;

  constructor(vector: Vector<T>, index: number, length: number) {
    super();
    // TODO unwrap vector if it is a SubVector
    this.#vector = vector;
    this.startIndex = index;
    this.#length = length;
  }

  override get length(): number {
    return this.#length;
  }

  override at(index: number): T | null {
    if (index < 0 || index >= this.length) {
      return null;
    }
    return this.#vector.at(this.startIndex + index);
  }
}

// TOOO ReverseVector
