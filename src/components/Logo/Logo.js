import React from "react";
import burgerLogo from "../../assets/images/burgerlogo.png";
import classes from "./Logo.css";

export default function Logo() {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="myLogo" />
    </div>
  );
}
