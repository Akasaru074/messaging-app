import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  return auth.checkAuthStatus().pipe(map(resp=>{
    
    if (resp.authenticated) {
      auth.setUserName(resp.username);
      return true;
    }
    else {
      router.navigate(["/login"]);
      return false;
    }
  }), catchError(()=>{
    router.navigate(["/login"]);
    return [false];
  }));

};
