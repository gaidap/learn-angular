import {Component, OnInit} from '@angular/core';
import {Recipe} from "../model/recipe";
import {ShoppingService} from "../../shared/services/shopping.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../services/recipe.service";
import {Ingredient} from "../../shared/model/ingredient";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe?: Recipe;

  constructor(
    private shoppingService: ShoppingService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipe = this.recipeService.getRecipe(+params['id']);
    });
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    if (!ingredients || ingredients.length === 0) {
      this.toastr.error('No ingredients to add to the shopping list.', 'Error!');
      return;
    }
    this.shoppingService.addIngredients(ingredients);
    this.toastr.success('Added ingredients to the shopping list.', 'Success!');

  }
}
