import {Ingredient} from "../../shared/model/ingredient";

export class Recipe {
  private constructor(
    readonly name: string,
    readonly description: string,
    readonly imagePath: string,
    readonly ingredients: Ingredient[],
  ) {
  }

  static createRecipe(name: string, description: string, imagePath: string, ingredients: Ingredient[] = []) {
    return new Recipe(name, description, imagePath, ingredients);
  }
}
