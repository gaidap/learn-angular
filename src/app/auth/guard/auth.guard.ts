import {CanActivateFn, Router} from '@angular/router';
import {map, take} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user.pipe(take(1), map(user => {
    const isAuth = !!user;
    if (isAuth) {
      return true;
    }
    return router.createUrlTree(['/auth']);
  }));
};
