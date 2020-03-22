import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import axiosInstance from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

export default class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Samuel Idehen",
        address: "101 amazon "
      },
      deliveryMethod: "Fastest"
    };
    axiosInstance
      .post("/orders.json", order)
      .then(response => {
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(error =>
        this.setState({
          loading: false
        })
      );
  };
  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="enter your name" />
        <input type="email" name="email" placeholder="enter your email" />
        <input type="text" name="street" placeholder="enter your street" />
        <input
          type="text"
          name="postalCode"
          placeholder="enter your postalCode"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          {" "}
          Place Order
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div style={contactDataStyles}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}
const contactDataStyles = {
  margin: "20px auto",
  width: "80%",
  textAlign: "center",
  boxShadow: "0 2px 3px #ccc",
  border: "1px solid #eee",
  padding: "10px",
  boxSizing: "border-box",
  display: "block"
};
