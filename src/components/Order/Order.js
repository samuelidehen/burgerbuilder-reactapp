import React from "react";
import classes from "./Order.css";
export default function Order(props) {
  const ingredients = [];
  for (let ingName in props.ingredients) {
    ingredients.push({ name: ingName, amount: props.ingredients[ingName] });
  }

  const ingredientOutput = ingredients.map(ig => {
    return (
      <p
        style={{
          color: "blue",
          border: "1px solid #ccc",
          padding: "5px",
          width: "100px"
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </p>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Customer Name : {props.customer}</p>
      <div>Ingredients :{ingredientOutput}</div>
      <p>
        Price: <strong>{props.price.toFixed(2)}</strong>{" "}
      </p>
    </div>
  );
}
