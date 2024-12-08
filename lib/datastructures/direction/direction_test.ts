import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { getDirectionVector, turn } from "./direction.ts";

describe("Directions", () => {
  it("method getDirectionVector", () => {
    expect(getDirectionVector("up")).toEqual([0, -1]);
    expect(getDirectionVector("down")).toEqual([0, 1]);
    expect(getDirectionVector("left")).toEqual([-1, 0]);
    expect(getDirectionVector("right")).toEqual([1, 0]);
    expect(getDirectionVector("up-left")).toEqual([-1, -1]);
    expect(getDirectionVector("up-right")).toEqual([1, -1]);
    expect(getDirectionVector("down-left")).toEqual([-1, 1]);
    expect(getDirectionVector("down-right")).toEqual([1, 1]);
  });

  it("method turn", () => {
    expect(turn("up", 45)).toBe("up-right");
    expect(turn("up", 90)).toBe("right");
    expect(turn("up", 135)).toBe("down-right");
    expect(turn("up", 180)).toBe("down");
    expect(turn("up", 225)).toBe("down-left");
    expect(turn("up", 270)).toBe("left");
    expect(turn("up", 315)).toBe("up-left");
    expect(turn("up", 360)).toBe("up");
  });
});
