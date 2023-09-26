import {Ingredient} from './ingredient';

describe('Ingredient', () => {
  it('should create an instance', () => {
    const ingredient = Ingredient.createIngredient('TestIngredient', 10);
    // Check if the object has correct properties and values
    expect(ingredient.name).toEqual('TestIngredient');
    expect(ingredient.amount).toEqual(10);
  });
});
