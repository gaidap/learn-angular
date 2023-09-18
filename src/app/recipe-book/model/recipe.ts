export class Recipe {
  readonly name: string;

  readonly description: string;

  readonly imagePath: string;

  private constructor(name: string, description: string, imagePath: string) {
    this.imagePath = imagePath;
    this.description = description;
    this.name = name;
  }

  static createRecipe(name: string, description: string, imagePath: string) {
    return new Recipe(name, description, imagePath);
  }
}
