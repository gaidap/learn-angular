import {Injectable} from '@angular/core';
import {Recipe} from "../model/recipe";
import {Ingredient} from "../../shared/model/ingredient";
import {Subject} from "rxjs";

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

  recipesChanged = new Subject<Recipe[]>();

  constructor() {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id?: number) {
    if (!id) {
      return undefined;
    }

    return this.recipes.find(recipe => recipe.id === id);
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, updatedRecipe: Recipe) {
    const index = this.recipes.findIndex(recipe => recipe.id === id);
    if (index !== -1) {
      this.recipes[index] = updatedRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }
  }

  deleteRecipe(id: number) {
    const index = this.recipes.findIndex(recipe => recipe.id === id);
    if (index !== -1) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
  }
}
