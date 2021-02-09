import { Ingredient } from '../../shared/ingredient.model';

import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: ShoppingListState;
}

const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Apple', 5), new Ingredient('Tomato', 11)],
  editedIngredient: null as Ingredient,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: ShoppingListState = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
      
    case ShoppingListActions.UPDATE_INGREDIENT:
      var index = action.payload.index;
      if (index < 0 || index >= state.ingredients.length) return state;

      const existingIngredient = state.ingredients[index];

      const newIngredient = {
        existingIngredient,
        ...action.payload.ingredient,
      };

      const newIngredients = [...state.ingredients];

      newIngredients[index] = newIngredient;

      return { ...state, ingredients: newIngredients };

    case ShoppingListActions.DELETE_INGREDIENT:
      const minusDeletedIngredient = state.ingredients.filter((ingred, i) => {
        return i !== action.payload;
      });

      return { ...state, ingredients: minusDeletedIngredient };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };

    case ShoppingListActions.STOP_EDIT:
      return { ...state, editedIngredientIndex: -1, editedIngredient: null };

    default:
      return state;
  }
}
