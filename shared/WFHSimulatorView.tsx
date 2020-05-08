import React from "react";
import styled from "styled-components";
import pluralize from "pluralize";

import BlobImage from "./img/blob.png";

const Game = styled.div`
  display: grid;
  grid-gap: 10px;
`;

const Controls = styled.div`
  text-align: center;
`;

const Button = styled.button`
  font-size: 13px;
`;

const GameField = styled.div`
  border-color: #68e7c2;
  border-width: 5px;
  border-style: solid;
  width: 500px;
  height: 400px;
  position: relative;
`;

const Steps: React.FC<{ steps: number }> = ({ steps, ...props }) => (
  <StepsDisplay {...props}>{pluralize("step", steps, true)}</StepsDisplay>
);

const StepsDisplay = styled.div`
  color: #68e7c2;
  font-family: monospace;
  font-weight: bold;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const CHARACTER_WIDTH = 100;

const CharacterAppearance = styled.div`
  width: ${CHARACTER_WIDTH}px;
  height: 150px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 86px 100px;
  background-image: url(${BlobImage});
  position: absolute;
  bottom: 0;
`;

type CharacterProps = {
  position: CharacterPosition;
  direction: CharacterDirection;
};

const Character = styled(CharacterAppearance)<CharacterProps>`
  left: ${({ position }) => position * CHARACTER_WIDTH}px;
  transform: scaleX(${({ direction }) => (direction === "left" ? -1 : 1)});
`;

type Props = {
  characterPosition: CharacterPosition;
  characterDirection: CharacterDirection;
  stepsCount: number;
  onMove(): void;
};

export type CharacterPosition = number;
export type CharacterDirection = "left" | "right";

export const WFHSimulatorView: React.FC<Props> = ({
  characterPosition,
  characterDirection,
  stepsCount,
  onMove
}) => (
  <Game>
    <GameField>
      <Steps steps={stepsCount} data-testid="steps-count" />
      <Character
        position={characterPosition}
        direction={characterDirection}
        data-testid="character"
      />
    </GameField>
    <Controls>
      <Button onClick={onMove} data-testid="move-button">
        Move
      </Button>
    </Controls>
  </Game>
);

WFHSimulatorView.displayName = "WFHSimulatorView";
