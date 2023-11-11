export class Ingredient {
  private constructor(readonly name: string, readonly amount: number) {
  }

  static createIngredient(name: string, amount: number): Ingredient {
    return new Ingredient(name, amount);
  }
}
