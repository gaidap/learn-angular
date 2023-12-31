import {Recipe} from "../../recipe-book/model/recipe";
import {Ingredient} from "../model/ingredient";

export const recipeFixtures: Recipe[] = [
  Recipe.createRecipe(
    1,
    'Gnocchi a mozzarella i tomatá',
    'A gnocchi dish best served steaming hot.',
    'https://t.ly/bbJ5O',
    [
      Ingredient.createIngredient('Mozzarella', 3),
      Ingredient.createIngredient('Garlic', 2),
      Ingredient.createIngredient('Tomatoes', 5),
      Ingredient.createIngredient('Gnocchi', 2),
    ]
  ),
  Recipe.createRecipe(
    2,
    'Spaghetti con broccoli arabiatta',
    'Really spicy spaghetti with tomato sauce.',
    'https://t.ly/mIEkB',
    [
      Ingredient.createIngredient('Broccoli', 2),
      Ingredient.createIngredient('Spaghetti', 1),
      Ingredient.createIngredient('Garlic', 2),
      Ingredient.createIngredient('Jalapenos', 5),
      Ingredient.createIngredient('Tomatoes', 5),
    ]
  ),
];
