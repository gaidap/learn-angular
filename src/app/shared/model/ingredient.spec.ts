import {Ingredient} from './ingredient';

describe('Ingredient', () => {
  it('should create an instance', () => {
    expect(Ingredient.createIngredient("TestIngredient", 10)).toBeTruthy();
  });
});
