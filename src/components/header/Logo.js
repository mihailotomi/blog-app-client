import React from "react";

import classes from "../../styles/Header/Header.module.scss";

const Logo = ({ name }) => {
  return (
    <svg
      width="150"
      height="40"
      xmlns="http://www.w3.org/2000/svg"
      className={classes.logo}
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <g>
        <title>Layer 1</title>
        <text
          strokeDasharray="5,2,2,2,2,2"
          fontStyle="italic"
          transform="matrix(2.22121 0 0 2.37913 -166.084 -377.121)"
          stroke="#000"
          fontWeight="bold"
          textAnchor="start"
          fontFamily="'Satisfy'"
          fontSize="12"
          id="svg_1"
          y="169.63016"
          x="75.28388"
          strokeWidth="0"
          fill="#000"
        >
          {name}
        </text>
      </g>
    </svg>
  );
};

export default Logo;
