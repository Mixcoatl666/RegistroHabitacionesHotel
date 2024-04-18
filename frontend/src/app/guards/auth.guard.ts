// src/app/auth.guard.ts

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);  // Convirtiendo la cadena JSON en un objeto
      // Comprobamos si hay roles definidos en la ruta y si el rol del usuario está en esos roles
      const roles = next.data['roles'] as Array<string>;
      if (roles && roles.indexOf(user.rol) === -1) {
        // Si el rol no está autorizado, redirigimos a la página principal
        this.router.navigate(['/']);
        return false;
      }
      // Si está autorizado, permitimos la activación de la ruta
      return true;
    }

    // Si no hay usuario en localStorage, redirigimos al login con la URL de retorno
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
  
}
