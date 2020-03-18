import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
const INGREDIENTS_PRICE = {
  salad: 0.7,
  cheese: 1.5,
  meat: 1.2,
  bacon: 1.3
};
export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 5,
    purchasable: false
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

  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1;
    const UpdatedIngredients = {
      ...this.state.ingredients
    };
    UpdatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENTS_PRICE[type];
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
    const priceReduction = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceReduction;
    this.setState({
      ingredients: UpdatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchasable(UpdatedIngredients);
  };
  render() {
    const { ingredients } = this.state;
    const { totalPrice } = this.state;
    const disabledInfo = { ...ingredients };
    const { purchasable } = this.state;
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal>
          {" "}
          <OrderSummary ingredients={ingredients} />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={purchasable}
        />
      </Aux>
    );
  }
}
