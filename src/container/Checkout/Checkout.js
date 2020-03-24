import React, { Component } from "react";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
class Checkout extends Component {
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
          ingredients={this.props.ings}
          oncheckoutCancelled={this.checkoutCancelHandler}
          oncheckoutContinued={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-form"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ings: state.ingredients };
};

export default connect(mapStateToProps)(Checkout);
