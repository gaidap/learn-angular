import {Injectable} from '@angular/core';
import {DataStorageService} from "../../shared/services/data-storage.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../model/recipe";
import {Observable} from "rxjs";
import {RecipeService} from "./recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length > 0) {
      return recipes;
    }

    return this.dataStorageService.fetchRecipes();
  }
}
