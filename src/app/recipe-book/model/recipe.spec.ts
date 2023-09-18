import { Recipe } from './recipe';

describe('Recipe', () => {
  it('should create an instance', () => {
    expect(Recipe.createRecipe("TestName", "TestDescription", "/test/path")).toBeTruthy();
  });
});
