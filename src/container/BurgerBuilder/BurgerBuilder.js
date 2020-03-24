import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionTypes from "../../store/action";

import axios from "axios";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

class BurgerBuilder extends Component {
  state = {
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
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
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
    const { totalPrice, purchasable, purchasing } = this.state;
    const disabledInfo = { ...this.props.ings };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    let burger = <Spinner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={totalPrice}
            purchasable={purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
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
const mapStateToProps = state => {
  return {
    ings: state.ingredients
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),

    onIngredientRemoved: ingName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
