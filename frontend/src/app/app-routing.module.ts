import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioMucamaComponent } from './components/inicio-mucama/inicio-mucama.component';
import { InicioRecepcionistaComponent } from './components/inicio-recepcionista/inicio-recepcionista.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { AuthGuard } from './guards/auth.guard';
import { EditHabitacionesComponent } from './components/edit-habitaciones/edit-habitaciones.component';

const routes: Routes = [
  { path:'inicio-mucama', title:'Inicio', component:InicioMucamaComponent, canActivate: [AuthGuard], data: { roles: ['mucama'] }},
  { path:'inicio-recepcionista', title:'Inicio', component:InicioRecepcionistaComponent,  canActivate: [AuthGuard], data: { roles: ['recepcionista'] }},
  { path:'inicio-sesion', title:'Iniciar Sesión', component:IniciarSesionComponent },
  {path:'edit/:id',component:EditHabitacionesComponent,title:"Editar Habitaciones"},
  { path:'', redirectTo:'inicio-sesion', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
