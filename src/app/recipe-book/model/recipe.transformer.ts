import {Recipe} from "./recipe";
import {ingredientToObject} from "../../shared/model/ingredient.transformer";

export const recipeToObject = (recipe: Recipe) => {
  return {
    id: recipe.id,
    name: recipe.name,
    imagePath: recipe.imagePath,
    description: recipe.description,
    ingredients: recipe.ingredients.map(ingredient => ingredientToObject(ingredient)),
  };
}
