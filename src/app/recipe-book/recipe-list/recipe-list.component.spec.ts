import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of , Subject} from 'rxjs';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let mockRecipeService: any;
  let mockRouter: any;
  let subject$: Subject<any>;

  beforeEach(waitForAsync(() => {
    subject$ = new Subject<any>();
    // Mocking RecipeService and Router
    mockRecipeService = { getRecipes: jasmine.createSpy('getRecipes'), recipesChanged: subject$.asObservable() };
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [RecipeListComponent],
      providers: [
        { provide: RecipeService, useValue: mockRecipeService },
        { provide: Router, useValue: mockRouter }
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
