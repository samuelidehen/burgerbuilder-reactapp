import React from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.css";
export default function Layout(props) {
  return (
    <Aux>
      <div>Toolbar, SideDrawer,BackDrop</div>
      <main className={classes.content}>{props.children}</main>
    </Aux>
  );
}
