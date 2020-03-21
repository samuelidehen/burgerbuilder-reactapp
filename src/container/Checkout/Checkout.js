import React, { Component } from "react";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";

export default class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      meat: 0,
      cheese: 2
    }
  };
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkoutComtinueHandler = () => {
    this.props.history.push("/contact-form");
  };
  render() {
    return (
      <div>
        <CheckOutSummary
          ingredients={this.state.ingredients}
          oncheckoutCancelled={this.checkoutCancelHandler}
          oncheckoutContinued={this.checkoutComtinueHandler}
        />
      </div>
    );
  }
}
