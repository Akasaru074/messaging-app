import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.checkAuthStatus().pipe(map(resp=>{
      if (resp.authenticated == false) return true;
      else {
        router.navigateByUrl("/");
        return false;
      }
    }));

};
