import React, { Component } from "react";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
export default class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredient = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = +param[1];
      } else {
        ingredient[param[0]] = +param[1];
      }
    }
    this.setState({
      ingredients: ingredient,
      totalPrice: price
    });
  }
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-form");
  };
  render() {
    return (
      <div>
        <CheckOutSummary
          ingredients={this.state.ingredients}
          oncheckoutCancelled={this.checkoutCancelHandler}
          oncheckoutContinued={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-form"}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
