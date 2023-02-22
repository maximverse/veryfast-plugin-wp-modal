import React from "react";
import styled from "@emotion/styled";

const XClose = () => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="#667085"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const Svg = styled.svg`
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  position: relative;
`;

export default XClose;
