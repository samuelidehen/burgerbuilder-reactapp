import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import axiosInstance from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

export default class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: ""
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your address"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest"
      }
    },
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: formData
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
  inputChangeHandler = (e, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElem = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElem.value = e.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElem;
    this.setState({
      orderForm: updatedOrderForm
    });
  };
  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success"> Place Order</Button>
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
  margin: "0 auto",
  width: "30%",
  border: "1px solid #ccc",
  padding: "20px"
};
