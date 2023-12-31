import {Ingredient} from "../../shared/model/ingredient";

export class Recipe {
  private constructor(
    readonly id: number,
    readonly name: string,
    readonly description: string,
    readonly imagePath: string,
    readonly ingredients: Ingredient[],
  ) {
  }

  static createRecipe(id: number, name: string, description: string, imagePath: string, ingredients: Ingredient[] = []) {
    return new Recipe(id, name, description, imagePath, ingredients);
  }
}
