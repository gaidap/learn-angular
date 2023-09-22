import {Component, Input} from '@angular/core';
import {Recipe} from "../model/recipe";
import {ShoppingService} from "../../shared/services/shopping.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe!: Recipe;

  constructor(
    private shoppingService: ShoppingService,
    private toastr: ToastrService
  ) {
  }

  onAddToShoppingList(recipe: Recipe) {
    this.shoppingService.addIngredients(recipe.ingredients);
    this.toastr.success('Added ingredients to the shopping list.', 'Success!');

  }
}
