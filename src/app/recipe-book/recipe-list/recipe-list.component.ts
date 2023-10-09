import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../model/recipe";
import {RecipeService} from "../services/recipe.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  private recipesChangedSub?: Subscription;

  constructor(private recipeService: RecipeService, private router: Router) {
  }

  ngOnInit(): void {
    this.recipesChangedSub = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      });
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.recipesChangedSub?.unsubscribe();
  }

  onCreateRecipe() {
    this.router.navigate(['recipes', 'new']);
  }
}
