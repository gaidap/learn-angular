import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeBookComponent} from './recipe-book.component';
import {RouterTestingModule} from "@angular/router/testing";
import {Component} from "@angular/core";

@Component({
  selector: 'app-recipe-list',
  template: ''
})
class MockRecipeListComponent {
}

describe('RecipeBookComponent', () => {
  let component: RecipeBookComponent;
  let fixture: ComponentFixture<RecipeBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Add RouterTestingModule here
      declarations: [RecipeBookComponent, MockRecipeListComponent]
    });
    fixture = TestBed.createComponent(RecipeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
