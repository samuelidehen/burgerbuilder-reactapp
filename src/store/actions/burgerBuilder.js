import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

const setIngredient = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients
  };
};

export const fetchIngFailed = () => {
  return {
    type: actionTypes.FETCH_INGFAILED
  };
};

export const initIngredient = () => {
  return dispatch => {
    axios
      .get("https://burger-reactapp-bf88e.firebaseio.com/ingredients.json")
      .then(response => {
        dispatch(setIngredient(response.data));
      })
      .catch(error => {
        dispatch(fetchIngFailed());
      });
  };
};
