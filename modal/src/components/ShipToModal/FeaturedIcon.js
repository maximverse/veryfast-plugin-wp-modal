import React from "react";
import styled from "@emotion/styled";

const FeaturedIcon = () => {
  return (
    <Svg
      width={56}
      height={56}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x={4} y={4} width={48} height={48} rx={24} fill="#D1FADF" />
      <path
        d="M23.5 28L26.5 31L32.5 25M38 28C38 33.5228 33.5228 38 28 38C22.4772 38 18 33.5228 18 28C18 22.4772 22.4772 18 28 18C33.5228 18 38 22.4772 38 28Z"
        stroke="#039855"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x={4}
        y={4}
        width={48}
        height={48}
        rx={24}
        stroke="#ECFDF3"
        strokeWidth={8}
      />
    </Svg>
  );
};

const Svg = styled.svg`
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  position: relative;
`;

export default FeaturedIcon;
