// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { clienteAxios } from '../helpers/clienteAxios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private router:Router) {
    if (this.isLocalStorageSupported()) {
      this.loadUser();
    }
  }

  isLocalStorageSupported(): boolean {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await clienteAxios.post('http://localhost:4000/api/empleados/login', {
        email,
        contrasenia: password
      });
      const { nombre, rol, token } = response.data;
      if (this.isLocalStorageSupported()) {
        const user = { nombre, rol, token };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return { token, rol };
    } catch (error) {
      console.error('Error de autenticación', error);
      throw error;
    }
  }

  loadUser() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.currentUserSubject.next(user);
    }
  }

  getCurrentUser() {
    return this.currentUserSubject.asObservable();
  }

  logout() {
    if (this.isLocalStorageSupported()) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']); 
    }
  }
}
