import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingService} from "../../shared/services/shopping.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  editMode = false;
  editedItemIndex?: number;

  private startEditingSub!: Subscription;
  @ViewChild('form')
  private form!: NgForm;


  constructor(private shoppingService: ShoppingService) {
  }

  ngOnInit(): void {
    this.startEditingSub = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        const ingredient = this.shoppingService.getIngredient(index);
        this.form.setValue({
          name: ingredient.name,
          amount: ingredient.amount
        })
      });
  }

  ngOnDestroy(): void {
    this.startEditingSub.unsubscribe();
  }

  onSaveItem() {
    const name = this.form.value.name;
    const amount = this.form.value.amount;
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex!, name, amount);
    } else {
      this.shoppingService.addIngredient(name, amount);
    }
    this.onResetForm();
  }

  onRemoveItem(index?: number) {
    if (!index) {
      return;
    }

    this.shoppingService.removeIngredient(index);
    this.onResetForm();
  }

  onResetForm() {
    this.editMode = false;
    this.form.reset();
  }
}
