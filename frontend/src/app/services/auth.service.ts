// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import axios from 'axios';  // Asegúrate de importar axios si no tienes un clienteAxios listo.

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clienteAxios = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: { 'Content-Type': 'application/json' }
  });
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private router: Router) {
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
      const response = await this.clienteAxios.post('/empleados/login', {
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

  async registerEmpleado(empleado: any): Promise<any> {
    try {
      const response = await this.clienteAxios.post('/empleados/register', empleado);
      return response.data;  // Aquí se manejaría la respuesta del servidor.
    } catch (error) {
      console.error('Error al registrar el empleado', error);
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
