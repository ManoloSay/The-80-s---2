import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredRole = next.data['role'] as string;
    const userRole = this.authService.getUserRole();

    if (this.authService.isLoggedIn() && userRole === requiredRole) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}