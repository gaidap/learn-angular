import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RecipeDetailComponent} from './recipe-detail.component';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {of} from 'rxjs';
import {Ingredient} from '../../shared/model/ingredient';
import {RecipeService} from '../services/recipe.service';
import {ShoppingService} from '../../shared/services/shopping.service';
import {RouterTestingModule} from "@angular/router/testing";

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let mockShoppingService: any;
  let mockRecipeService: any;
  let mockToastrService: any;
  let mockActivatedRoute;

  beforeEach(() => {
    mockShoppingService = {
      addIngredients: jasmine.createSpy('addIngredients')
    };

    mockRecipeService = {
      getRecipe: jasmine.createSpy('getRecipe').and.returnValue({id: 1, name: 'Test Recipe'}),
    };

    mockToastrService = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };

    mockActivatedRoute = {
      params: of({id: 1}),
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Add RouterTestingModule here
      declarations: [RecipeDetailComponent],
      providers: [
        {
          provide: ShoppingService,
          useValue: mockShoppingService
        },
        {
          provide: RecipeService,
          useValue: mockRecipeService
        },
        {
          provide: ToastrService,
          useValue: mockToastrService
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getRecipe on ngOnInit', () => {
    expect(mockRecipeService.getRecipe).toHaveBeenCalledWith(1);
  });

  it('should add ingredients to shopping list and pop a success toast when onAddToShoppingList is called with ingredients', () => {
    let ingredients: Ingredient[] = [
      {name: 'Test Ingredient', amount: 1}
    ];

    component.onAddToShoppingList(ingredients);

    expect(mockShoppingService.addIngredients).toHaveBeenCalledWith(ingredients);
    expect(mockToastrService.success).toHaveBeenCalledWith('Added ingredients to the shopping list.', 'Success!');
  });

  it('should not add ingredients to shopping list and pop an error toast when onAddToShoppingList is called with no ingredients', () => {
    component.onAddToShoppingList([]);

    expect(mockShoppingService.addIngredients).not.toHaveBeenCalled();
    expect(mockToastrService.error).toHaveBeenCalledWith('No ingredients to add to the shopping list.', 'Error!');
  });
});
