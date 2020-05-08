import { renderHook, act } from "@testing-library/react-hooks";

import { useWFHSimulator } from "./App";

describe("useWFHSimulator", () => {
  describe("Character", () => {
    it("moves until it reaches the wall, then turns around", () => {
      const { result } = renderHook(useWFHSimulator);

      // it starts at the position "right" facing right
      expect(result.current.characterPosition).toEqual(1);
      expect(result.current.characterDirection).toEqual("right");

      act(() => result.current.move());
      expect(result.current.characterPosition).toEqual(2);
      expect(result.current.characterDirection).toEqual("right");

      act(() => result.current.move());
      expect(result.current.characterPosition).toEqual(3);
      expect(result.current.characterDirection).toEqual("right");

      act(() => result.current.move());
      expect(result.current.characterPosition).toEqual(4);
      expect(result.current.characterDirection).toEqual("right");

      // position 4 is special - character reaches the wall and is turning around

      act(() => result.current.move());
      expect(result.current.characterPosition).toEqual(4);
      expect(result.current.characterDirection).toEqual("left");

      act(() => result.current.move());
      expect(result.current.characterPosition).toEqual(3);
      expect(result.current.characterDirection).toEqual("left");

      act(() => result.current.move());
      expect(result.current.characterPosition).toEqual(2);
      expect(result.current.characterDirection).toEqual("left");

      act(() => result.current.move());
      expect(result.current.characterPosition).toEqual(1);
      expect(result.current.characterDirection).toEqual("left");

      act(() => result.current.move());
      expect(result.current.characterPosition).toEqual(0);
      expect(result.current.characterDirection).toEqual("left");

      // position 0 is special - character reaches the wall and is turning around

      act(() => result.current.move());
      expect(result.current.characterPosition).toEqual(0);
      expect(result.current.characterDirection).toEqual("right");

      act(() => result.current.move());
      expect(result.current.characterPosition).toEqual(1);
      expect(result.current.characterDirection).toEqual("right");

      // we've come full circle
    });
  });

  describe("Steps count", () => {
    it("starts at 0 and increments every time character moves", () => {
      const { result } = renderHook(useWFHSimulator);
      expect(result.current.stepsCount).toEqual(0);

      act(() => result.current.move());
      expect(result.current.stepsCount).toEqual(1);

      act(() => result.current.move());
      expect(result.current.stepsCount).toEqual(2);

      act(() => result.current.move());
      expect(result.current.stepsCount).toEqual(3);
    });
  });
});
