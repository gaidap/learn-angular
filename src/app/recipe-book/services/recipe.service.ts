import {Injectable} from '@angular/core';
import {Recipe} from "../model/recipe";
import {Ingredient} from "../../shared/model/ingredient";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
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

  constructor() {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.find(recipe => recipe.id === id);
  }
}
