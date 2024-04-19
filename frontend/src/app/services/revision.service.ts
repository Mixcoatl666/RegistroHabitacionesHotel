import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {
  private apiUrl = 'http://localhost:4000/api/revision';

  constructor(private http: HttpClient) { }

  iniciarRevision(habitacionId: string, nombreMucama: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/iniciar`, { habitacionId, nombreMucama });
  }

  finalizarRevision(revisionId: string, revisionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/finalizar/${revisionId}`, revisionData);
  }

  getRevisionesPorMucama(nombreMucama: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nMucama`, { params: { nombreMucama } });
  }

  filtrarRevisiones(nombreMucama?: string, fechaInicio?: Date, fechaFin?: Date): Observable<any[]> {
    const params: any = {};
    if (nombreMucama) params.nombreMucama = nombreMucama;
    if (fechaInicio) params.fechaInicio = fechaInicio.toISOString();
    if (fechaFin) params.fechaFin = fechaFin.toISOString();

    return this.http.get<any[]>(`${this.apiUrl}/filtrar`, { params });
  }
}