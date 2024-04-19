// src/app/components/inicio-mucama/inicio-mucama.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RevisionService } from '../../services/revision.service';

declare var bootstrap: any;  // Esto es necesario para usar Bootstrap sin jQuery

@Component({
  selector: 'app-inicio-mucama',
  templateUrl: './inicio-mucama.component.html',
  styleUrls: ['./inicio-mucama.component.css']
})
export class InicioMucamaComponent implements OnInit {
  nombre: string = '';
  revisiones: any[] = [];
  selectedRevision: any;

  constructor(private authService: AuthService, private revisionService: RevisionService) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.nombre = currentUser.nombre;
    this.loadRevisiones();
  }

  loadRevisiones() {
    this.revisionService.getRevisionesPorMucama(this.nombre).subscribe({
      next: (data) => {
        this.revisiones = data;
      },
      error: (error) => console.error('Error al obtener revisiones:', error)
    });
  }

  openModal(revision: any) {
    this.selectedRevision = revision;
    const modalElement = document.getElementById('revisionModal');
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
  }

  submitRevision() {
    const revisionData = {
      itemsRevisados: this.selectedRevision.itemsRevisados.map((item: any) => ({
        nombre: item.nombre,
        cantidadEncontrada: item.cantidadEncontrada,
        estado: item.estado,
        comentario: item.comentario
      })),
      frigobarItems: this.selectedRevision.frigobarItems
    };
    
    this.revisionService.finalizarRevision(this.selectedRevision._id, revisionData).subscribe({
      next: () => {
        alert('Revisión finalizada con éxito.');
        this.loadRevisiones();
      },
      error: (error) => console.error('Error al finalizar revisión:', error)
    });
  }

  logOut() {
    this.authService.logout();
  }
}