import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {RecipeService} from '../services/recipe.service';
import {ShoppingService} from '../../shared/services/shopping.service';
import {RecipeDetailComponent} from './recipe-detail.component';
import {Recipe} from '../model/recipe';
import {Ingredient} from '../../shared/model/ingredient';
import {of} from "rxjs";

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let recipeService: jasmine.SpyObj<RecipeService>;
  let shoppingService: jasmine.SpyObj<ShoppingService>;
  let toastr: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const recipeServiceSpy = jasmine.createSpyObj('RecipeService', ['getRecipe', 'deleteRecipe']);
    const shoppingServiceSpy = jasmine.createSpyObj('ShoppingService', ['addIngredients']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['error', 'success']);

    await TestBed.configureTestingModule({
      declarations: [RecipeDetailComponent],
      providers: [
        {provide: RecipeService, useValue: recipeServiceSpy},
        {provide: ShoppingService, useValue: shoppingServiceSpy},
        {provide: ToastrService, useValue: toastrServiceSpy},
        {provide: ActivatedRoute, useValue: {params: of({id: '1'})}},
        {provide: Router, useValue: {navigate: jasmine.createSpy('navigate')}}
      ]
    })
      .compileComponents();

    recipeService = TestBed.inject(RecipeService) as jasmine.SpyObj<RecipeService>;
    shoppingService = TestBed.inject(ShoppingService) as jasmine.SpyObj<ShoppingService>;
    toastr = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch a recipe on Init', () => {
    const testRecipe = Recipe.createRecipe(
      1,
      'Test',
      'TestDescription',
      'TestImageUrl',
      [Ingredient.createIngredient('Test', 1)]);
    recipeService.getRecipe.withArgs(1).and.returnValue(testRecipe);

    component.ngOnInit();

    expect(component.recipe).toEqual(testRecipe);
  });

  it('should add ingredients to shopping list and show success toastr', () => {
    const ingredients = [{}, {}] as Ingredient[];
    component.onAddToShoppingList(ingredients);

    expect(shoppingService.addIngredients).toHaveBeenCalledWith(ingredients);
    expect(toastr.success).toHaveBeenCalled();
  });

  it('should delete a recipe and navigate back', () => {
    component.recipe = Recipe.createRecipe(
      1,
      'Test',
      'TestDescription',
      'TestImageUrl',
      [Ingredient.createIngredient('Test', 1)]);

    component.onDeleteRecipe();

    expect(recipeService.deleteRecipe).toHaveBeenCalledWith(1);
    expect(fixture.debugElement.injector.get(Router).navigate).toHaveBeenCalledWith(['..'], jasmine.any(Object));
  });
});
