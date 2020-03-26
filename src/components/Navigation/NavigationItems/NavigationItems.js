import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

export default function NavigationItems(props) {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>

      {!props.isAuth ? (
        <NavigationItem link="/auth">Login</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout</NavigationItem>
      )}
    </ul>
  );
}
