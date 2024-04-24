import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HabitacionesService } from '../../services/habitacion.service';
import { ToastrService } from 'ngx-toastr';
import { RevisionService } from '../../services/revision.service';

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
  revisiones: any[] = [];
  nombreMucama: string = '';
  fechaInicio!: Date;
  fechaFin!: Date;

  empleado: any = {
    nombre: '',
    email: '',
    contrasenia: '',
    rol: ''
  };
  
  constructor(
    private authService: AuthService,
    private habitacionesService: HabitacionesService,
    private revisionService: RevisionService,
    private toastr: ToastrService
  ) 
  {
    this.fechaInicio = new Date();
    this.fechaFin = new Date();
  }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.nombre = currentUser.nombre;
    this.buscarHabitaciones();
    this.cargarRevisiones();
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
  

  // Asegúrate de marcar el método como `async`
async registrarEmpleado() {
  try {
    // Espera la respuesta de la promesa usando await
    await this.authService.registerEmpleado(this.empleado);
    this.toastr.success('Empleado registrado con éxito');
    // Limpiar el formulario después de registrar con éxito
    this.empleado = { nombre: '', email: '', contrasenia: '', rol: '' };
  } catch (error) {
    // Manejar errores. Asegúrate de acceder a la propiedad correcta para el mensaje de error.
    console.log('Algo salio mal')
  }
}

  
  cargarRevisiones() {
    this.revisionService.filtrarRevisiones().subscribe({
      next: (data) => {
        this.revisiones = data;
        if (!data.length) {
          this.toastr.info('No se encontraron revisiones.');
        }
      },
      error: (error) => {
        console.error('Error al obtener revisiones:', error);
        this.toastr.error('Error al cargar revisiones: ' + error.message);
      }
    });
  }
  
  aplicarFiltros() {
    if ((this.fechaInicio && this.fechaInicio instanceof Date) && (this.fechaFin && this.fechaFin instanceof Date)) {
      this.revisionService.filtrarRevisiones(this.nombreMucama, this.fechaInicio, this.fechaFin).subscribe({
        next: (data) => {
          this.revisiones = data;
          if (!data.length) {
            this.toastr.error('No se encontraron revisiones con los filtros aplicados.');
          }
        },
        error: (error) => {
          console.error('Error al filtrar revisiones:', error);
          this.toastr.error('Error al filtrar revisiones: ' + error.message);
        }
      });
    } else {
      this.toastr.error('Las fechas ingresadas no son válidas.');
    }
  }
  
  limpiarFiltrosRevision() {
    this.nombreMucama = '';
    //this.fechaInicio = yyyy-MM-dd;
    //this.fechaFin = Date:'yyyy-MM-dd';
    this.cargarRevisiones();  // Recargar todas las revisiones sin filtros
  }
  
  onFechaInicioChange(event: any) {
    this.fechaInicio = new Date(event.target.value);
    console.log(this.fechaInicio); // Verifica que la fecha sea válida
  }
  
  onFechaFinChange(event: any) {
    this.fechaFin = new Date(event.target.value);
    console.log(this.fechaFin); // Verifica que la fecha sea válida
  }  
}