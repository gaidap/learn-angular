import {NgModule} from '@angular/core';
import {AuthComponent} from "./auth.component";
import {SharedModule} from "../shared/shared.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {AuthRoutingModule} from "./auth-routing/auth-routing.module";


@NgModule({
  declarations: [AuthComponent],
  imports: [HttpClientModule, SharedModule, AuthRoutingModule],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
})
export class AuthModule {
}
