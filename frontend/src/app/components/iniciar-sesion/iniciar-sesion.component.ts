import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(this.email, this.password)
      .then(user => {
        if (user.rol === 'mucama') {
          this.router.navigate(['/inicio-mucama']);
        } else if (user.rol === 'recepcionista') {
          this.router.navigate(['/inicio-recepcionista']);
        }
      })
      .catch(error => {
        console.error('Login fallido', error);
      });
  }
}
