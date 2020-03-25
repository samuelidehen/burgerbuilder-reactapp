import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0
  },

  totalPrice: 5
};

const INGREDIENT_PRICE = {
  salad: 0.7,
  cheese: 1.5,
  meat: 1.2,
  bacon: 1.3
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
      };

    default:
      return state;
  }
};

export default reducer;
