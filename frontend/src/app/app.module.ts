import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioMucamaComponent } from './components/inicio-mucama/inicio-mucama.component';
import { InicioRecepcionistaComponent } from './components/inicio-recepcionista/inicio-recepcionista.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InicioMucamaComponent,
    IniciarSesionComponent,
    InicioRecepcionistaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
