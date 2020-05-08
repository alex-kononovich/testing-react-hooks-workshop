import React, { useState, useCallback } from "react";
import { CenterView } from "../../shared/CenterView";
import {
  WFHSimulatorView,
  CharacterDirection,
  CharacterPosition
} from "../../shared/WFHSimulatorView";

export const App = () => {
  const [steps, setSteps] = useState(0);
  const [position, setPosition] = useState<CharacterPosition>(1);
  const [direction, setDirection] = useState<CharacterDirection>("right");

  const move = useCallback(() => {
    switch (direction) {
      case "right":
        if (position < 4) {
          setPosition(position + 1);
          setSteps(steps + 1);
        } else {
          setDirection("left");
        }
        break;

      case "left":
        if (position > 0) {
          setPosition(position - 1);
          setSteps(steps + 1);
        } else {
          setDirection("right");
        }
        break;
    }
  }, [position, direction, steps]);

  return (
    <CenterView>
      <WFHSimulatorView
        characterPosition={position}
        characterDirection={direction}
        stepsCount={steps}
        onMove={move}
      />
    </CenterView>
  );
};

App.displayName = "App";
