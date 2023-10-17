import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeBookComponent} from "../recipe-book.component";
import {authGuard} from "../../auth/guard/auth.guard";
import {RecipeHomeComponent} from "../recipe-home/recipe-home.component";
import {RecipeEditComponent} from "../recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "../recipe-detail/recipe-detail.component";
import {RecipesResolverService} from "../services/recipes-resolver.service";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '', component: RecipeBookComponent, canActivate: [authGuard], children: [
      {path: '', component: RecipeHomeComponent, pathMatch: 'full'},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ],
})
export class RecipeRoutingModule {
}
