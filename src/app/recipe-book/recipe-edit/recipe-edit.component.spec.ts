import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RecipeEditComponent} from './recipe-edit.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';

import {RecipeService} from '../services/recipe.service';
import {Recipe} from '../model/recipe';
import {Ingredient} from "../../shared/model/ingredient";
import {RouterTestingModule} from "@angular/router/testing";


describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;
  let recipeService: jasmine.SpyObj<RecipeService>;
  let router: any;
  let route: any;


  beforeEach(() => {
    recipeService = jasmine.createSpyObj('RecipeService', ['getRecipe', 'getRecipes', 'addRecipe', 'updateRecipe']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [RecipeEditComponent],
      providers: [
        {provide: RecipeService, useValue: recipeService},
        {provide: Router, useValue: router},
        {provide: ActivatedRoute, useValue: {params: of({id: 1})}},
        FormBuilder
      ]
    }).compileComponents();

    recipeService = TestBed.inject(RecipeService) as jasmine.SpyObj<RecipeService>;

    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update recipe when edit mode is true', () => {
    component.editMode = true;
    component.id = 1;
    component.recipeForm = new FormGroup({});
    component.onSubmit();
    expect(recipeService.updateRecipe).toHaveBeenCalledWith(1, component.recipeForm.value);
    expect(router.navigate).toHaveBeenCalledWith(['..'], jasmine.any(Object));
  });

  it('should add recipe when edit mode is false', () => {
    component.editMode = false;
    component.id = 1;
    component.recipeForm = new FormGroup({});
    recipeService.getRecipes.and.returnValue([Recipe.createRecipe(
      1,
      'Test Recipe',
      'https://path/image.jpg',
      'Test description',
    ),
      Recipe.createRecipe(
        2,
        'Test Recipe 2',
        'https://path/image.jpg',
        'Test description',
      )]);
    component.onSubmit();
    expect(recipeService.addRecipe).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['..'], jasmine.any(Object));
  });

  it('should set editMode to true if id is provided', () => {
    expect(component.editMode).toBe(true);
  });

  it('should add an ingredient', () => {
    const recipe: Recipe = Recipe.createRecipe(
      1,
      'Test Recipe',
      'path/image.jpg',
      'Test description',
      [
        Ingredient.createIngredient('Apple', 1),
      ]);

    recipeService.getRecipe.and.returnValue(recipe);
    component.ngOnInit();
    const initialLength = component.recipeForm.get('ingredients')?.value.length;
    component.onAddIngredient();
    const finalLength = component.recipeForm.get('ingredients')?.value.length;
    expect(finalLength).toBeGreaterThan(initialLength);
  });

  it('should remove an ingredient', () => {
    component.onRemoveIngredient();
    // Add your assertions here
    // There should be a way to check if the ingredient was removed.
    // Since the provided onRemoveIngredient() function doesn't actually do anything yet, we cannot write a meaningful test for it.
  });

  it('should initialize the form in editMode', () => {
    const recipe: Recipe = Recipe.createRecipe(
      1,
      'Test Recipe',
      'path/image.jpg',
      'Test description',
      [
        Ingredient.createIngredient('Apple', 1),
      ]);

    recipeService.getRecipe.and.returnValue(recipe);
    component.ngOnInit();
    expect(component.recipeForm.value).toEqual(recipe.toObject());
  });

  it('should initialize an empty form not in editMode', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [RecipeEditComponent],
      providers: [
        {provide: RecipeService, useValue: recipeService},
        {provide: Router, useValue: {navigate: jasmine.createSpy('navigate')}},
        {provide: ActivatedRoute, useValue: {params: of({})}},
        FormBuilder
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;

    const emptyFormValue = {
      id: NaN,
      name: '',
      imagePath: '',
      description: '',
      ingredients: []
    };

    component.ngOnInit();
    expect(component.recipeForm.value).toEqual(emptyFormValue);
    expect(component.editMode).toBe(false);
  });
});
