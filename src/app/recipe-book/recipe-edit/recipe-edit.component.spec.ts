import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RecipeEditComponent} from './recipe-edit.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';

import {RecipeService} from '../services/recipe.service';
import {Recipe} from '../model/recipe';
import {Ingredient} from "../../shared/model/ingredient";

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;
  let recipeService: jasmine.SpyObj<RecipeService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('RecipeService', ['getRecipe']);

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [RecipeEditComponent],
      providers: [
        {provide: RecipeService, useValue: spy},
        {provide: Router, useValue: {navigate: jasmine.createSpy('navigate')}},
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

  it('should set editMode to true if id is provided', () => {
    expect(component.editMode).toBe(true);
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
