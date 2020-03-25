import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  error: false,
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
    case actionTypes.SET_INGREDIENT:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false
      };
    case actionTypes.FETCH_INGFAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
