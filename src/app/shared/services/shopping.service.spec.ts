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

  it('should add ingredient', inject([ShoppingService], (service: ShoppingService) => {
    service.addIngredient('Bananas', 3);
    expect(service.getIngredients()).toContain(Ingredient.createIngredient('Bananas', 3));
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

});
