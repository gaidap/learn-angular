export class Recipe {
  private constructor(readonly name: string, readonly description: string, readonly imagePath: string) {
  }

  static createRecipe(name: string, description: string, imagePath: string) {
    return new Recipe(name, description, imagePath);
  }
}
