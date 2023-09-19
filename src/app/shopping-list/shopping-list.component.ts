import {Component, ViewChild} from '@angular/core';
import {Ingredient} from "../shared/model/ingredient";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {


  ingredients: Ingredient[] = [];

     onIngredientAdded(ingredient: Ingredient) {
         this.ingredients.push(ingredient);
     }
}
