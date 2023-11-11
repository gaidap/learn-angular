import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeHomeComponent} from './recipe-home.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('RecipeHomeComponent', () => {
  let component: RecipeHomeComponent;
  let fixture: ComponentFixture<RecipeHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Add RouterTestingModule here
      declarations: [RecipeHomeComponent]
    });
    fixture = TestBed.createComponent(RecipeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
