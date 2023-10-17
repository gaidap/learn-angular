import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownDirective} from "./directives/dropdown.directive";
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner/loading-spinner.component";
import {AlertComponent} from "./components/alert/alert/alert.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  exports: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastrModule,
  ]
})
export class SharedModule {
}
