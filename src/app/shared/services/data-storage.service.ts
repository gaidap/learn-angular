import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../../recipe-book/services/recipe.service";
import {Recipe} from "../../recipe-book/model/recipe";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      'https://learning-angular-56fa9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes
    ).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  fetchRecipes() {
    this.http.get<Recipe[]>(
      'https://learning-angular-56fa9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    ).subscribe({
      next: response => {
        console.log(response);
        this.recipeService.setRecipes(response);
      },
      error: error => {
        console.error(error);
      }
    });
  }
}
