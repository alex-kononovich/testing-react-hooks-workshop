import React, { useState, useCallback } from "react";
import { CenterView } from "../../shared/CenterView";
import {
  WFHSimulatorView,
  CharacterDirection,
  CharacterPosition
} from "../../shared/WFHSimulatorView";
import { BlobGallery } from "../../shared/BlobGallery";

export const useWFHSimulator = () => {
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

  return {
    characterPosition: position,
    characterDirection: direction,
    stepsCount: steps,
    move
  };
};

export const App = () => {
  const game = useWFHSimulator();
  const gallery = useWFHSimulator();

  return (
    <CenterView>
      <WFHSimulatorView
        characterPosition={game.characterPosition}
        characterDirection={game.characterDirection}
        stepsCount={game.stepsCount}
        onMove={game.move}
      />
      <BlobGallery
        current={gallery.characterPosition}
        direction={gallery.characterDirection}
        onNext={gallery.move}
      />
    </CenterView>
  );
};

App.displayName = "App";
