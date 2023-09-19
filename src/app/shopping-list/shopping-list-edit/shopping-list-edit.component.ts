import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/model/ingredient";

@Component({
    selector: 'app-shopping-list-edit',
    templateUrl: './shopping-list-edit.component.html',
    styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
    @ViewChild('nameInput') nameInput!: ElementRef;
    @ViewChild('amountInput') amountInput!: ElementRef;
    @Output() ingredientAdded = new EventEmitter<Ingredient>();

    onAddItem() {
        const name = this.nameInput.nativeElement.value;
        const amount = +this.amountInput.nativeElement.value;
        this.ingredientAdded.emit(Ingredient.createIngredient(name, amount));
    }

    onRemoveItem($event: MouseEvent) {
        console.log($event);
    }

    onResetForm() {
        this.nameInput.nativeElement.value = '';
        this.amountInput.nativeElement.value = '';
    }
}
