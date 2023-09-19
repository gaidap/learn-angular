import {Component, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../model/recipe";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() itemSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    Recipe.createRecipe(
      'A Test Recipe',
      'This is simply a test',
      'https://t.ly/bbJ5O'
    ),
    Recipe.createRecipe(
      'Another Test Recipe',
      'This is another simple test',
      'https://t.ly/mIEkB'
    ),
  ];

  onItemSelect(selectedItem: Recipe) {
    this.itemSelected.emit(selectedItem);
  }
}
