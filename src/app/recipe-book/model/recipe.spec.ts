import {Recipe} from './recipe';

describe('Recipe', () => {
  it('should create an instance', () => {
    expect(Recipe.createRecipe(1, "TestName", "TestDescription", "/test/path")).toBeTruthy();
  });
});
