import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/model/ingredient";
import {ShoppingService} from "../shared/services/shopping.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];

  private ingredientAddedSub!: Subscription;

  constructor(private shoppingService: ShoppingService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.ingredientAddedSub = this.shoppingService.ingredientAdded.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy(): void {
    this.ingredientAddedSub.unsubscribe();
  }
}
