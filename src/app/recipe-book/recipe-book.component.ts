import { Component } from '@angular/core';
import {Recipe} from "./model/recipe";

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent {
  selectedItem!: Recipe;
}
