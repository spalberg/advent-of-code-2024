import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { Vector } from "./vector.ts";

describe("Vector", () => {
  it("factory from", () => {
    expect(Vector.from([1, 2, 3, 4, 5, 6]).length).toBe(6);
    expect(Vector.from([]).length).toBe(0);
    expect(Vector.from([{ x: 1, y: 2 }, { x: 3, y: 4 }]).length).toBe(2);
  });

  it("factory fromStrings", () => {
    expect(Vector.fromString("123456").length).toBe(6);
  });
});

describe("ArrayVector", () => {
  vectorImplTestSuite(Vector.from([1, 2, 3, 4, 5, 6]));
});

export function vectorImplTestSuite(vector: Vector<number>) {
  it("method at", () => {
    expect(vector.at(0)).toBe(1);
    expect(vector.at(5)).toBe(6);
    expect(vector.at(6)).toBe(null);
    expect(vector.at(-1)).toBe(null);
  });

  it("method toString", () => {
    expect(vector.toString()).toBe("[1,2,3,4,5,6]");
    expect(Vector.from([]).toString()).toBe("[]");
  });

  it("method equals", () => {
    expect(vector.equals(Vector.from([1, 2, 3, 4, 5, 6]))).toBe(true);
    expect(vector.equals(Vector.from([1, 2, 3, 4, 5]))).toBe(false);
  });

  it("method indexOf", () => {
    expect(vector.indexOf(1)).toBe(0);
    expect(vector.indexOf(3)).toBe(2);
    expect(vector.indexOf(6)).toBe(5);
    expect(vector.indexOf(7)).toBe(-1);
    expect(vector.indexOf(Vector.from([3, 4, 5]))).toBe(2);
    expect(vector.indexOf(Vector.from([3, 4, 7]))).toBe(-1);
    expect(vector.indexOf(Vector.from([]))).toBe(0);
    expect(vector.indexOf(Vector.from([1, 2, 3, 4, 5, 6, 7]))).toBe(-1);
  });

  it("method subvector", () => {
    expect(vector.subvector(0, vector.length).equals(vector)).toBe(true);
    expect(vector.subvector(1, 3).equals(Vector.from([2, 3, 4]))).toBe(true);
    expect(vector.subvector(1, 3).subvector(1, 1).equals(Vector.from([3])))
      .toBe(true);
    expect(() => vector.subvector(4, -1)).toThrow();
    expect(() => vector.subvector(-1, 1)).toThrow();
    expect(() => vector.subvector(1, 6)).toThrow();
  });

  it("method [Symbol.iterator]", () => {
    const values = [...vector];
    expect(values).toEqual([1, 2, 3, 4, 5, 6]);
  });
}
