import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "../model/recipe";
import {Ingredient} from "../../shared/model/ingredient";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    Recipe.createRecipe(
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
  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
