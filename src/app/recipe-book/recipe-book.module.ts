import {NgModule} from '@angular/core';
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeBookComponent} from "./recipe-book.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeHomeComponent} from "./recipe-home/recipe-home.component";
import {SharedModule} from "../shared/shared.module";
import {RecipeRoutingModule} from "./recipe-routing/recipe-routing.module";


@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeBookComponent,
    RecipeEditComponent,
    RecipeHomeComponent,
  ],
  imports: [RecipeRoutingModule, SharedModule]
})
export class RecipeBookModule {
}
