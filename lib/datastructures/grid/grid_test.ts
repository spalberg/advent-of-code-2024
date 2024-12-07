import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { vectorImplTestSuite } from "../vector/vector_test.ts";
import { Grid, GridColumnVector } from "./grid.ts";

describe("Grid", () => {
  const smallTestGrid = Grid.from([
    [1, 2, 3],
    [4, 5, 6],
  ]);

  it("factory from", () => {
    expect(smallTestGrid.height).toBe(2);
    expect(smallTestGrid.width).toBe(3);
    expect(() => {
      Grid.from([
        [1, 2, 3],
        [4, 5],
      ]);
    }).toThrow("Rows have different lengths");
    expect(() => {
      Grid.from([]);
    }).toThrow("Grid is empty");
  });

  it("factory fromStrings", () => {
    const grid = Grid.fromStrings(["123", "456"]);
    expect(grid.height).toBe(2);
    expect(grid.width).toBe(3);
  });

  it("method at", () => {
    expect(smallTestGrid.at(1, 1)).toBe(5);
    expect(smallTestGrid.at(2, 0)).toBe(3);
    expect(smallTestGrid.at(2, 2)).toBe(null);
  });

  it("method rows", () => {
    const rows = [...smallTestGrid.rows()];
    expect(rows.length).toBe(2);
    expect(rows[0].length).toBe(3);
    expect(rows[0].at(0)).toBe(1);
    expect(rows[1].length).toBe(3);
    expect(rows[1].at(0)).toBe(4);
  });

  it("method columns", () => {
    const columns = [...smallTestGrid.columns()];
    expect(columns.length).toBe(3);
    expect(columns[0].length).toBe(2);
    expect(columns[0].at(0)).toBe(1);
    expect(columns[0].at(1)).toBe(4);
    expect(columns[1].length).toBe(2);
    expect(columns[1].at(0)).toBe(2);
  });
});

describe("GridColumnVector", () => {
  const grid = Grid.from([
    [0, 1, 0],
    [0, 2, 0],
    [0, 3, 0],
    [0, 4, 0],
    [0, 5, 0],
    [0, 6, 0],
  ]);
  const gridColumn = new GridColumnVector(grid, 1);
  vectorImplTestSuite(gridColumn);
});
