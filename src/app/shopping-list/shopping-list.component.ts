import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../shared/model/ingredient";
import {ShoppingService} from "../shared/services/shopping.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor(private shoppingService: ShoppingService) {
    this.shoppingService.ingredientAdded.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
  }
}
