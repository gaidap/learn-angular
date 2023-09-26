import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RecipeItemComponent} from './recipe-item.component';
import {Recipe} from "../../model/recipe";
import {RouterTestingModule} from "@angular/router/testing";

// This is a mock Recipe object used for testing
const testRecipe: Recipe = Recipe.createRecipe(1, "Test Recipe", "Test Description", "https://www.test.com", []);

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Add RouterTestingModule here
      declarations: [RecipeItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept input property recipe', () => {
    component.recipe = testRecipe;
    fixture.detectChanges();
    expect(component.recipe).toEqual(testRecipe);
  });
});
