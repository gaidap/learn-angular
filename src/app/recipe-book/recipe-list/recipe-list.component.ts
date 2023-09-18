import {Component} from '@angular/core';
import {Recipe} from "../model/recipe";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  recipes: Recipe[] = [
    Recipe.createRecipe(
      'A Test Recipe',
      'This is simply a test',
      't.ly/bbJ5O'
    ),
  ];

}
