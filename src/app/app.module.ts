import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- Import FormsModule
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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthComponent} from './auth/auth/auth.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner/loading-spinner.component';
import {AuthInterceptor} from "./auth/auth/interceptor/auth.interceptor";
import { AlertComponent } from './shared/components/alert/alert/alert.component';

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
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgOptimizedImage,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    AppRoutingModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
