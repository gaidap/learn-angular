import {Component, OnInit} from '@angular/core';
import {Recipe} from "../model/recipe";
import {RecipeService} from "../services/recipe.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private router: Router) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onCreateRecipe() {
    this.router.navigate(['recipes', 'new']);
  }
}
