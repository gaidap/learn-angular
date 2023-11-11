import {inject, TestBed} from '@angular/core/testing';
import {ShoppingService} from './shopping.service';
import {Ingredient} from '../model/ingredient';

describe('ShoppingService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingService]
    });
  });

  it('should be created', inject([ShoppingService], (service: ShoppingService) => {
    expect(service).toBeTruthy();
  }));

  it('should add ingredient at the end', inject([ShoppingService], (service: ShoppingService) => {
    service.addIngredient('Bananas', 3);
    let ingredients = service.getIngredients();
    let ingredientsSize = ingredients.length;
    expect(ingredients[ingredientsSize - 1].name).toEqual('Bananas');
    expect(ingredients[ingredientsSize - 1].amount).toEqual(3);
  }));

  it('should remove ingredient', inject([ShoppingService], (service: ShoppingService) => {
    service.removeIngredient(0);
    expect(service.getIngredients()).not.toContain(Ingredient.createIngredient('Apples', 5));
  }));

  it('should add multiple ingredients', inject([ShoppingService], (service: ShoppingService) => {
    service.addIngredients([Ingredient.createIngredient('Orange', 2), Ingredient.createIngredient('Mangoes', 4)]);
    expect(service.getIngredients()).toContain(Ingredient.createIngredient('Orange', 2));
    expect(service.getIngredients()).toContain(Ingredient.createIngredient('Mangoes', 4));
  }));
  it('should get an ingredient by index', inject([ShoppingService], (service: ShoppingService) => {
    service.addIngredient('Test1', 1);
    let ingredients = service.getIngredients();
    let ingredientsSize = ingredients.length;
    expect(service.getIngredient(ingredientsSize - 1).name).toEqual('Test1');
    expect(service.getIngredient(ingredientsSize - 1).amount).toEqual(1);
  }));

  it('should update an ingredient by number', inject([ShoppingService], (service: ShoppingService) => {
    service.addIngredient('Test2', 2);
    let ingredients = service.getIngredients();
    let ingredientsSize = ingredients.length;
    service.updateIngredient(ingredientsSize - 1, 'Updated', 3);
    expect(service.getIngredient(ingredientsSize - 1).name).toEqual('Updated');
    expect(service.getIngredient(ingredientsSize - 1).amount).toEqual(3);
  }));
});
