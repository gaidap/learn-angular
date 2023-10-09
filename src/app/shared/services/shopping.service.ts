import {Injectable} from '@angular/core';
import {Ingredient} from "../model/ingredient";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    Ingredient.createIngredient('Apples', 5),
    Ingredient.createIngredient('Tomatoes', 10),
  ];

  constructor() {
  }

  addIngredient(name: string, amount: number) {
    this.ingredients.push(Ingredient.createIngredient(name, amount));
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(number: number, name: string, amount: number) {
    this.ingredients[number] = Ingredient.createIngredient(name, amount);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
