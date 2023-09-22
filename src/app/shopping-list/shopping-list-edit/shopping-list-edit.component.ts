import {Component, ElementRef, ViewChild} from '@angular/core';
import {ShoppingService} from "../../shared/services/shopping.service";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('amountInput') amountInput!: ElementRef;


  constructor(private shoppingService: ShoppingService) {
  }

  onAddItem() {
    const name = this.nameInput.nativeElement.value;
    const amount = +this.amountInput.nativeElement.value;
    this.shoppingService.addIngredient(name, amount);
  }

  onRemoveItem($event: MouseEvent) {
    console.log($event);
  }

  onResetForm() {
    this.nameInput.nativeElement.value = '';
    this.amountInput.nativeElement.value = '';
  }
}
