import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private userRole: string = 'user';

  login(username: string, password: string) {
    if (username === 'admin' && password === 'adminpass') {
      this.isAuthenticated = true;
      this.userRole = 'admin';
    } else if (username === 'user' && password === 'userpass') {
      this.isAuthenticated = true;
      this.userRole = 'user';
    } else {
      this.isAuthenticated = false;
      this.userRole = '';
    }
  }

  assignUserRole(role: string) {
    this.userRole = role;
  }
  
  logout() {
    this.isAuthenticated = false;
    this.userRole = '';
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUserRole(): string {
    return this.userRole;
  }

  isUserAdmin(): boolean {
    return this.userRole === 'admin';
  }

  isUserUser(): boolean {
    return this.userRole === 'user';
  }
}
