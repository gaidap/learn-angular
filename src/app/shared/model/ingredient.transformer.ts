import {Ingredient} from "./ingredient";

export const ingredientToObject = (ingredient: Ingredient) => {
  return {
    name: ingredient.name,
    amount: ingredient.amount,
  };
}
