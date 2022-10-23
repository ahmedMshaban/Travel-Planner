import React from "react";
import classes from "./Button.module.css";

interface Props {
  children: React.ReactNode;
  outline?: boolean;
  className?: string;
  [rest: string]: any;
}

const Button: React.FC<Props> = ({ children, outline, className, ...rest }) => {
  return (
    <button
      className={`${classes.btn} ${
        outline ? classes.btnOutline : classes.btnDefault
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
