import {TestBed} from '@angular/core/testing';
import {RecipeService} from './recipe.service';
import {ShoppingService} from "../../shared/services/shopping.service";

describe('RecipeService', () => {
  let service: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingService]
    });
    service = TestBed.inject(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
