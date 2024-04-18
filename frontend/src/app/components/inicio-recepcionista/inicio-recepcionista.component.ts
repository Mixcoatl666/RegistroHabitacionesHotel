import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HabitacionesService } from '../../services/habitacion.service';

@Component({
  selector: 'app-inicio-recepcionista',
  templateUrl: './inicio-recepcionista.component.html',
  styleUrl: './inicio-recepcionista.component.css'
})
export class InicioRecepcionistaComponent implements OnInit {
  nombre: string = '';

  habitacion: any = {
    numeroHabitacion: null,
    piso: null,
    estadoHabitacion: '',
    nombreMucama: '',
    clienteHospedado: '',
    caracteristicas: {
      sabanas: {
        estado: '',
        cantidad: 0
      },
      toallas: {
        estado: '',
        cantidad: 0
      },
      frigobar: []
    }
  };

  constructor(
    private authService: AuthService,
    private habitacionesService: HabitacionesService 
  ) {};

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.nombre = currentUser.nombre;
  }

  logOut() {
    this.authService.logout();
  }

  crearHabitacion() {
    this.habitacionesService.crearHabitacion(this.habitacion).subscribe({
      next: (res: any) => {
        console.log('Habitación creada:', res);
        alert('Habitación creada con éxito!');
        // Restablecer el modelo de habitación a su estado inicial
        this.resetHabitacion();
      },
      error: (err: any) => {
        console.error('Error al crear habitación:', err);
        alert('Error al crear la habitación: ' + err.message);
      }
    });
  }

  agregarItemFrigobar() {
    if (!this.habitacion.caracteristicas.frigobar) {
      this.habitacion.caracteristicas.frigobar = [];
    }
    this.habitacion.caracteristicas.frigobar.push({ item: '', cantidad: 0 });
  }
  

  resetHabitacion() {
    this.habitacion = {
      numeroHabitacion: null,
      piso: null,
      estadoHabitacion: '',
      nombreMucama: '',
      clienteHospedado: '',
      caracteristicas: {
        sabanas: {
          estado: '',
          cantidad: 0
        },
        toallas: {
          estado: '',
          cantidad: 0
        },
        frigobar: []
      }
    };
  }
}