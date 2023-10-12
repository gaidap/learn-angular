import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../../recipe-book/services/recipe.service";
import {Recipe} from "../../recipe-book/model/recipe";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return;
    }

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
    return this.http.get<Recipe[]>(
      'https://learning-angular-56fa9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    ).pipe(map(
        recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }
      ),
      tap(
        recipes => {
          console.log(recipes);
          this.recipeService.setRecipes(recipes);
        }
      ),
    );
  }
}
