import * as actionTypes from "./action";

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    meat: 2,
    bacon: 0
  },

  totalPrice: 5
};

const reducer = (state = initialState, action) => {
  switch (action.types) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        }
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        }
      };

    default:
      return state;
  }
};

export default reducer;
