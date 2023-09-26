import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RecipeListComponent} from './recipe-list.component';
import {RecipeService} from '../services/recipe.service';
import {Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let mockRecipeService: any;
  let mockRouter: any;

  beforeEach(async(() => {
    // Mocking RecipeService and Router
    mockRecipeService = jasmine.createSpyObj(['getRecipes']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
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
    expect(component).toBeTruthy();
  });

  it('should call getRecipes on RecipeService during initialization', () => {
    mockRecipeService.getRecipes.and.returnValue(of());
    fixture.detectChanges();
    expect(mockRecipeService.getRecipes).toHaveBeenCalled();
  });

  it('should navigate to new recipe path when onCreateRecipe is called', () => {
    component.onCreateRecipe();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['recipes', 'new']);
  });
});
