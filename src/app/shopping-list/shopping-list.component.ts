import { Component } from '@angular/core';
import {Ingredient} from "../shared/model/ingredient";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    Ingredient.createIngredient("Apples", 5),
    Ingredient.createIngredient("Tomatoes", 10)
  ];
}
