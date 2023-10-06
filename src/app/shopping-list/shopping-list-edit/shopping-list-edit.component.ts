import {Component} from '@angular/core';
import {ShoppingService} from "../../shared/services/shopping.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {


  constructor(private shoppingService: ShoppingService) {
  }

  onAddItem(form: NgForm) {
    const name = form.value.name;
    const amount = form.value.amount;
    this.shoppingService.addIngredient(name, amount);
    form.reset();
  }

  onRemoveItem($event: MouseEvent) {
    console.log($event);
  }

  onResetForm(form: NgForm) {
    form.reset();
  }
}
