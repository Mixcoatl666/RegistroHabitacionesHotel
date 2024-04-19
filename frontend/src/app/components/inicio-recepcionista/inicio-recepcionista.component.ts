import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HabitacionesService } from '../../services/habitacion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio-recepcionista',
  templateUrl: './inicio-recepcionista.component.html',
  styleUrls: ['./inicio-recepcionista.component.css']
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
      sabanas: { estado: '', cantidad: 0 },
      toallas: { estado: '', cantidad: 0 },
      frigobar: []
    }
  };

  habitaciones: any[] = [];
  filtros: any = {};

  constructor(
    private authService: AuthService,
    private habitacionesService: HabitacionesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.nombre = currentUser.nombre;
    this.buscarHabitaciones();
  }

  logOut() {
    this.authService.logout();
  }

  crearHabitacion() {
    this.habitacionesService.crearHabitacion(this.habitacion).subscribe({
      next: (res: any) => {
        this.resetHabitacion();
        this.toastr.success('Habitación creada con éxito!');
      },
      error: (err: any) => {
        this.toastr.error('Error al crear la habitación: ' + err.message);
      }
    });
  }

  agregarItemFrigobar() {
    this.habitacion.caracteristicas.frigobar.push({ item: '', cantidad: 0 });
  }

  resetHabitacion() {
    this.habitacion = {
      numeroHabitacion: null, piso: null, estadoHabitacion: '',
      nombreMucama: '', clienteHospedado: '',
      caracteristicas: {
        sabanas: { estado: '', cantidad: 0 },
        toallas: { estado: '', cantidad: 0 },
        frigobar: []
      }
    };
  }

  buscarHabitaciones(): void {
    this.habitacionesService.obtenerHabitaciones(this.filtros).subscribe({
      next: (data) => {
        this.habitaciones = data;
        if (data.length === 0) {
          this.toastr.error('No se encontraron habitaciones con los filtros aplicados.');
        } else {
          this.toastr.success('Mostrando resultados');
        }
      },
      error: (error) => {
        this.toastr.error('Error al buscar las habitaciones');
      }
    });
  }

  limpiarFiltros(): void {
    this.filtros = {};
    this.buscarHabitaciones();
    this.toastr.info('Filtros limpiados, mostrando todas las habitaciones.');
  }
}