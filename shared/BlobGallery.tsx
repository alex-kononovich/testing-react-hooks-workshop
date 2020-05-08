import React from "react";
import styled from "styled-components";

import Blob1 from "./img/blob1.gif";
import Blob2 from "./img/blob2.gif";
import Blob3 from "./img/blob3.gif";
import Blob4 from "./img/blob4.gif";
import Blob5 from "./img/blob5.gif";

const blobs = [Blob1, Blob2, Blob3, Blob4, Blob5];

const Wrapper = styled.div`
  display: grid;
  grid-gap: 10px;
`;

const Controls = styled.div`
  text-align: center;
`;

const Button = styled.button`
  font-size: 13px;
`;

const Picture = styled.div<{ src: string }>`
  width: 500px;
  height: 400px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${({ src }) => src});
`;

type Props = {
  current: number;
  direction: "left" | "right";
  onNext(): void;
};

export const BlobGallery: React.FC<Props> = ({
  current,
  onNext,
  direction
}) => (
  <Wrapper>
    <Picture src={blobs[current]} />
    <Controls>
      <Button onClick={onNext}>
        {direction == "right" ? "Next" : "Previous"}
      </Button>
    </Controls>
  </Wrapper>
);

BlobGallery.displayName = "BlobGallery";
