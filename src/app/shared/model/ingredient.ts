export class Ingredient {
  private constructor(readonly name: string, readonly amount: number) {
  }

  static createIngredient(name: string, amount: number): Ingredient {
    return new Ingredient(name, amount);
  }

  toObject() {
    return {
      name: this.name,
      amount: this.amount,
    };
  }
}
