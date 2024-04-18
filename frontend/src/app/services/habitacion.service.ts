// habitaciones.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, catchError, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  private apiUrl = 'http://localhost:4000/api/habitacion';

  constructor() {}

  crearHabitacion(habitacion: any): Observable<any> {
    console.log("Datos enviados:", habitacion);
    return from(axios.post(`${this.apiUrl}`, habitacion)).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error en la creación de habitación:', error.response);
        throw error; // Puedes manejarlo o re-lanzar el error según lo necesites
      })
    );
  }

  obtenerHabitaciones(filtros?: any): Observable<any[]> {
    return from(axios.get(`${this.apiUrl}`, { params: filtros })).pipe(
      map(response => response.data)
    );
  }

  actualizarHabitacion(id: string, habitacion: any): Observable<any> {
    return from(axios.put(`${this.apiUrl}/${id}`, habitacion)).pipe(
      map(response => response.data)
    );
  }
}