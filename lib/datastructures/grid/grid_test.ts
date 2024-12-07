import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { Grid } from "./grid.ts";

const defaultGrid = new Grid([
  [1, 2, 3],
  [4, 5, 6],
]);

describe("Grid::new", () => {
  it("should handle well formed 2d arrays", () => {
    expect(defaultGrid.height).toBe(2);
    expect(defaultGrid.width).toBe(3);
  });

  it("should throw on malformed 2d arrays", () => {
    expect(() => {
      new Grid([
        [1, 2, 3],
        [4, 5],
      ]);
    }).toThrow("Rows have different lengths");
  });

  it("should throw on empty 2d arrays", () => {
    expect(() => {
      new Grid([]);
    }).toThrow("Grid is empty");
  });
});

describe("Grid.fromStrings", () => {
  it("should handle well formed strings", () => {
    const grid = Grid.fromStrings(["123", "456"]);
    expect(grid.height).toBe(2);
    expect(grid.width).toBe(3);
  });
});

describe("Grid::at", () => {
  it("should return the value at the given coordinates", () => {
    expect(defaultGrid.at(1, 1)).toBe(5);
    expect(defaultGrid.at(2, 0)).toBe(3);
    expect(defaultGrid.at(2, 2)).toBe(null);
  });
});

describe("Grid::rows", () => {
  it("should yield rows", () => {
    const rows = [...defaultGrid.rows()];
    expect(rows.length).toBe(2);
    expect(rows[0].length).toBe(3);
    expect(rows[0].at(0)).toBe(1);
    expect(rows[1].length).toBe(3);
    expect(rows[1].at(0)).toBe(4);
  });
});

describe("Grid::columns", () => {
  it("should yield columns", () => {
    const columns = [...defaultGrid.columns()];
    expect(columns.length).toBe(3);
    expect(columns[0].length).toBe(2);
    expect(columns[0].at(0)).toBe(1);
    expect(columns[0].at(1)).toBe(4);
    expect(columns[1].length).toBe(2);
    expect(columns[1].at(0)).toBe(2);
  });
});
