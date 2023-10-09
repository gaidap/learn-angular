import {TestBed} from '@angular/core/testing';
import {RecipeService} from './recipe.service';
import {ShoppingService} from "../../shared/services/shopping.service";
import {Recipe} from "../model/recipe";
import {Ingredient} from "../../shared/model/ingredient";

describe('RecipeService', () => {
  let service: RecipeService;
  let dummyRecipe: Recipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingService]
    });
    dummyRecipe = Recipe.createRecipe(
      3, // id
      'Test Recipe',
      'This is simply a test',
      'https://via.placeholder.com/150',
      [Ingredient.createIngredient('Test', 1)]
    );
    service = TestBed.inject(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('updateRecipe should not update the recipe if it does not exist', () => {
    const nonExistingId = 99;
    const updatedRecipe = Recipe.createRecipe(
      nonExistingId,
      'Updated Test Recipe',
      'This is simply a test - updated',
      'https://via.placeholder.com/150',
      [Ingredient.createIngredient('Test', 1)]
    );

    service.updateRecipe(nonExistingId, updatedRecipe);

    expect(service.getRecipes().find(recipe => recipe.id === nonExistingId)).toEqual(undefined);
  });

  // Test for 'addRecipe' method
  it('addRecipe should add a recipe', () => {
    service.addRecipe(dummyRecipe);
    expect(service.getRecipes().includes(dummyRecipe)).toBeTrue();
  });

  // Test for 'updateRecipe' method
  it('updateRecipe should update the recipe if it exists', () => {
    // First, add a recipe to be updated
    service.addRecipe(dummyRecipe);

    const updatedRecipe = Recipe.createRecipe(
      1, // same id as dummyRecipe
      'Updated Test Recipe',
      'This is simply a test - updated',
      'https://via.placeholder.com/150',
      [Ingredient.createIngredient('Test', 1)]
    );

    service.updateRecipe(1, updatedRecipe);

    expect(service.getRecipes().find(recipe => recipe.id === 1)).toEqual(updatedRecipe);
  });

  describe('getRecipes', () => {
    it('should return all recipes', () => {
      const recipes = service.getRecipes();
      expect(recipes.length).toBe(2);
      expect(recipes[0].name).toBe('Gnocchi a mozzarella i tomatá');
      expect(recipes[1].name).toBe('Spaghetti con broccoli arabiatta');
    });
  });

  describe('getRecipe', () => {
    it('should return a single recipe by id', () => {
      const recipe = service.getRecipe(1);
      expect(recipe?.name).toBe('Gnocchi a mozzarella i tomatá');

      const recipeTwo = service.getRecipe(2);
      expect(recipeTwo?.name).toBe('Spaghetti con broccoli arabiatta');
    });

    it('should return undefined for nonexistent recipe id', () => {
      const recipe = service.getRecipe(999);
      expect(recipe).toBeUndefined();
    });
  });
});
