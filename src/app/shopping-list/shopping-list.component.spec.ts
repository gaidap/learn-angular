import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingListEditComponent} from "./shopping-list-edit/shopping-list-edit.component";
import {FormsModule} from "@angular/forms";

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ShoppingListComponent, ShoppingListEditComponent]
    });
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
