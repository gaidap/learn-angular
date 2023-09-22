import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../model/ingredient";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredientAdded = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    Ingredient.createIngredient('Apples', 5),
    Ingredient.createIngredient('Tomatoes', 10),
  ];

  constructor() {
  }

  addIngredient(name: string, amount: number) {
    this.ingredients.push(Ingredient.createIngredient(name, amount));
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientAdded.emit(this.ingredients.slice());
  }
}
