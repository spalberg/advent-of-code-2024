import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { Vector } from "./vector.ts";

const defaultVector = new Vector([1, 2, 3, 4, 5, 6]);

describe("Vector::new", () => {
  it("should handle arrays", () => {
    expect(defaultVector.length).toBe(6);
    expect(new Vector([]).length).toBe(0);
    expect(new Vector([{ x: 1, y: 2 }, { x: 3, y: 4 }]).length).toBe(2);
  });
});

describe("Vector.fromStrings", () => {
  it("should work", () => {
    const vector = Vector.fromString("123456");
    expect(vector.length).toBe(6);
  });
});

describe("Vector::at", () => {
  it("should return the value at the given index", () => {
    expect(defaultVector.at(0)).toBe(1);
    expect(defaultVector.at(5)).toBe(6);
    expect(defaultVector.at(6)).toBe(null);
    expect(defaultVector.at(-1)).toBe(null);
  });
});

describe("Vector::equals", () => {
  it("should return true if the vectors are equal", () => {
    expect(defaultVector.equals(new Vector([1, 2, 3, 4, 5, 6]))).toBe(true);
    expect(defaultVector.equals(new Vector([1, 2, 3, 4, 5]))).toBe(false);
  });
});
