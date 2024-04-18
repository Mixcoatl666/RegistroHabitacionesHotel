import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inicio-mucama',
  templateUrl: './inicio-mucama.component.html',
  styleUrl: './inicio-mucama.component.css'
})
export class InicioMucamaComponent implements OnInit{
  nombre: string = '';

  constructor(private authService: AuthService) {};

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.nombre = currentUser.nombre;
  }

  logOut(){
    this.authService.logout();
  }
}
