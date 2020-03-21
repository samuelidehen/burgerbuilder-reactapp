import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckOutSummary.css";
const CheckOutSummary = props => {
  return (
    <div className={classes.CheckOutSummary}>
      <h1>I HOPE IT TASTE VERY WELL</h1>
      <div style={{ width: "100%", margin: "auto", marginRight: "40px" }}>
        {" "}
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.oncheckoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.oncheckoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckOutSummary;
