import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axiosInstance from "../../axios-orders";
import axios from "axios";

import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 5,
    purchasable: false,
    purchasing: false,
    loading: false,
    ingredient_price: null
  };

  updatePurchasable = ingredients => {
    const sum = Object.keys(ingredients)
      .map(ingrKey => ingredients[ingrKey])
      .reduce((sum, er) => {
        return sum + er;
      }, 0);
    this.setState({
      purchasable: sum > 0
    });
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Samuel Idehen",
        address: "101 amazon "
      },
      deliveryMethod: "Fastest"
    };
    axiosInstance
      .post("/orders.json", order)
      .then(response =>
        this.setState({
          loading: false
        })
      )
      .catch(error =>
        this.setState({
          loading: false
        })
      );
    this.purchaseCancelHandler();
  };

  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1;
    const UpdatedIngredients = {
      ...this.state.ingredients
    };
    UpdatedIngredients[type] = updatedCount;
    const priceAddition = this.state.ingredient_price[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      ingredients: UpdatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchasable(UpdatedIngredients);
  };
  removeIngredientHandler = type => {
    const updatedCount =
      this.state.ingredients[type] > 0 ? this.state.ingredients[type] - 1 : 0;
    const UpdatedIngredients = {
      ...this.state.ingredients
    };
    UpdatedIngredients[type] = updatedCount;
    const priceReduction = this.state.ingredient_price[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceReduction;
    this.setState({
      ingredients: UpdatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchasable(UpdatedIngredients);
  };

  componentDidMount() {
    const reqIngredient = axios.get(
      "https://burger-reactapp-bf88e.firebaseio.com/ingredients.json"
    );
    const reqIngredientPrice = axios.get(
      "https://burger-reactapp-bf88e.firebaseio.com/ingredients_price.json"
    );
    axios.all([reqIngredient, reqIngredientPrice]).then(
      axios.spread((...response) => {
        this.setState({
          ingredients: response[0].data,
          ingredient_price: response[1].data
        });
      })
    );
  }

  render() {
    const { ingredients, totalPrice, purchasable, purchasing } = this.state;
    const disabledInfo = { ...ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    let burger = <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={totalPrice}
            purchasable={purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={totalPrice}
        />
      );
    }
    return (
      <Aux>
        <Modal show={purchasing} closeBackdrop={this.purchaseCancelHandler}>
          {" "}
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
export default WithErrorHandler(BurgerBuilder, axios);
