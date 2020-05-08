import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { App } from "./App";

describe("App", () => {
  describe("Character", () => {
    it("moves until it reaches the wall, then turns around", () => {
      const { getByTestId } = render(<App />);
      const character = getByTestId("character");
      const moveButton = getByTestId("move-button");

      // it starts at the position 1 facing right
      expect(character).toHaveStyle("left: 100px");
      expect(character).toHaveStyle("transform: scaleX(1)");

      fireEvent.click(moveButton);
      expect(character).toHaveStyle("left: 200px");
      expect(character).toHaveStyle("transform: scaleX(1)");

      fireEvent.click(moveButton);
      expect(character).toHaveStyle("left: 300px");
      expect(character).toHaveStyle("transform: scaleX(1)");

      fireEvent.click(moveButton);
      expect(character).toHaveStyle("left: 400px");
      expect(character).toHaveStyle("transform: scaleX(1)");

      // position 4 is special - character reaches the wall and is turning around

      fireEvent.click(moveButton);
      expect(character).toHaveStyle("left: 400px");
      expect(character).toHaveStyle("transform: scaleX(-1)");

      fireEvent.click(moveButton);
      expect(character).toHaveStyle("left: 300px");
      expect(character).toHaveStyle("transform: scaleX(-1)");

      fireEvent.click(moveButton);
      expect(character).toHaveStyle("transform: scaleX(-1)");
      expect(character).toHaveStyle("left: 200px");

      fireEvent.click(moveButton);
      expect(character).toHaveStyle("left: 100px");
      expect(character).toHaveStyle("transform: scaleX(-1)");

      fireEvent.click(moveButton);
      expect(character).toHaveStyle("left: 0px");
      expect(character).toHaveStyle("transform: scaleX(-1)");

      // position 0 is special - character reaches the wall and is turning around

      fireEvent.click(moveButton);
      expect(character).toHaveStyle("left: 0px");
      expect(character).toHaveStyle("transform: scaleX(1)");

      fireEvent.click(moveButton);
      expect(character).toHaveStyle("left: 100px");
      expect(character).toHaveStyle("transform: scaleX(1)");

      // we've come full circle
    });
  });

  describe("Steps count", () => {
    it("starts at 0 and increments every time character moves", () => {
      const { getByTestId } = render(<App />);
      const stepsCount = getByTestId("steps-count");
      const moveButton = getByTestId("move-button");

      expect(stepsCount).toHaveTextContent("0 steps");

      fireEvent.click(moveButton);
      expect(stepsCount).toHaveTextContent("1 step");

      fireEvent.click(moveButton);
      expect(stepsCount).toHaveTextContent("2 steps");

      fireEvent.click(moveButton);
      expect(stepsCount).toHaveTextContent("3 steps");
    });
  });
});
