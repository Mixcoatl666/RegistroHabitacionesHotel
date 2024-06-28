import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioMucamaComponent } from './components/inicio-mucama/inicio-mucama.component';
import { InicioRecepcionistaComponent } from './components/inicio-recepcionista/inicio-recepcionista.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { FormsModule } from '@angular/forms';
//import { EditHabitacionesComponent } from './components/edit-habitaciones/edit-habitaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioMucamaComponent,
    IniciarSesionComponent,
    InicioRecepcionistaComponent,
    //EditHabitacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
