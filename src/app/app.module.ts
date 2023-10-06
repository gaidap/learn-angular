import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'; // <-- Import FormsModule
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingListEditComponent} from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import {RecipeListComponent} from './recipe-book/recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipe-book/recipe-list/recipe-item/recipe-item.component';
import {RecipeDetailComponent} from './recipe-book/recipe-detail/recipe-detail.component';
import {RecipeBookComponent} from './recipe-book/recipe-book.component';
import {DropdownDirective} from './shared/directives/dropdown.directive';
import {ToastrModule} from 'ngx-toastr';
import {RecipeEditComponent} from './recipe-book/recipe-edit/recipe-edit.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {RecipeHomeComponent} from './recipe-book/recipe-home/recipe-home.component';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeBookComponent,
    DropdownDirective,
    RecipeEditComponent,
    RecipeHomeComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        }),
        FormsModule, // <-- Include module in our AppModules
        AppRoutingModule,
        NgOptimizedImage,
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
