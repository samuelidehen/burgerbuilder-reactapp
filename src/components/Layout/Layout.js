import React from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
export default function Layout(props) {
  return (
    <Aux>
      <Toolbar />
      <main className={classes.content}>{props.children}</main>
    </Aux>
  );
}
