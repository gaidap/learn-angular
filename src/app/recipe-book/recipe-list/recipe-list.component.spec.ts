import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RecipeListComponent} from './recipe-list.component';
import {RecipeService} from '../services/recipe.service';
import {Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let mockRecipeService: any;
  let mockRouter: any;
  let mockSubject: any;

  beforeEach(async(() => {
    // Mocking RecipeService and Router
    mockRecipeService = jasmine.createSpyObj(['getRecipes'], ['recipesChanged']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockSubject = jasmine.createSpyObj(['subscribe']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [RecipeListComponent],
      providers: [
        {provide: RecipeService, useValue: mockRecipeService},
        {provide: Router, useValue: mockRouter}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the RecipeListComponent', () => {
    mockRecipeService.recipesChanged.and.returnValue(mockSubject);
    expect(component).toBeTruthy();
  });

  it('should call getRecipes on RecipeService during initialization', () => {
    mockRecipeService.recipesChanged.and.returnValue(mockSubject);
    mockRecipeService.getRecipes.and.returnValue(of());
    fixture.detectChanges();
    expect(mockRecipeService.getRecipes).toHaveBeenCalled();
  });

  it('should navigate to new recipe path when onCreateRecipe is called', () => {
    mockRecipeService.recipesChanged.and.returnValue(mockSubject);
    component.onCreateRecipe();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['recipes', 'new']);
  });
});
