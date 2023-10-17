import {NgModule} from '@angular/core';
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingListEditComponent} from "./shopping-list-edit/shopping-list-edit.component";
import {ShopRoutingModule} from "./shop-routing/shop-routing.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [ShoppingListComponent, ShoppingListEditComponent],
  imports: [SharedModule, ShopRoutingModule]
})
export class ShoppingListModule {
}
