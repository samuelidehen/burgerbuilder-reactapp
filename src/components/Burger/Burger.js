import React from "react";
import classes from "./Burger.css";
import Burgeringredient from "./Burgeringredient/Burgeringredient";
export default function Burger(props) {
  let transformedIngred = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((a, i) => {
        return <Burgeringredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngred.length < 1) {
    transformedIngred = <p>Please start building your burger</p>;
  }
  return (
    <div className={classes.Burger}>
      <Burgeringredient type="bread-top" />
      {transformedIngred}
      <Burgeringredient type="bread-bottom" />
    </div>
  );
}
