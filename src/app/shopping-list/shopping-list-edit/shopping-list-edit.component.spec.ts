import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShoppingListEditComponent} from './shopping-list-edit.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('ShoppingListEditComponent', () => {
  let component: ShoppingListEditComponent;
  let fixture: ComponentFixture<ShoppingListEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Add RouterTestingModule here
      declarations: [ShoppingListEditComponent]
    });
    fixture = TestBed.createComponent(ShoppingListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
