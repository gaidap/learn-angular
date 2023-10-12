import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RecipeBookComponent} from "../recipe-book/recipe-book.component";
import {ShoppingListComponent} from "../shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "../recipe-book/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "../recipe-book/recipe-edit/recipe-edit.component";
import {RecipeHomeComponent} from "../recipe-book/recipe-home/recipe-home.component";
import {RecipesResolverService} from "../recipe-book/services/recipes-resolver.service";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes', component: RecipeBookComponent, children: [
      {path: '', component: RecipeHomeComponent, pathMatch: 'full'},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ]
  },
  {
    path: 'shopping', component: ShoppingListComponent
  },
  {path: '**', redirectTo: '/recipes'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
