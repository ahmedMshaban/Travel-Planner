import React from "react";
import classes from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <svg
      className={classes.spinner}
      width="65px"
      height="65px"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={classes.path}
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
  );
};

export default Loader;
