import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    map((user) => {
      console.log('AuthGuard: Checking user authentication and email...');
      console.log('Current User:', user);

      if (user && authService.isEmailAllowed(user.email!)) {
        console.log('AuthGuard: User is authenticated and email is allowed.');
        return true;
      } else {
        console.log('AuthGuard: User is not authorized. Redirecting to /home.');
        return router.createUrlTree(['/home']);
      }
    })
  );
};
