import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MaterialModule } from './shared/material/material.module';
import { ListarComponent } from './estudiante/listar/listar.component';
import { CrearComponent } from './estudiante/crear/crear.component';
import { EditarComponent } from './estudiante/editar/editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListarComponent as ListarProfesorComponent } from './profesor/listar/listar.component';
import { CrearComponent as CrearProfesorComponent } from './profesor/crear/crear.component';
import { EditarComponent as EditarProfesorComponent } from './profesor/editar/editar.component';
import { ListarComponent as ListarNotaComponent } from './nota/listar/listar.component';
import { CrearComponent as CrearNotaComponent } from './nota/crear/crear.component';
import { EditarComponent as EditarNotaComponent } from './nota/editar/editar.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from './shared/paginator-spanish';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListarComponent,
    CrearComponent,
    EditarComponent,
    ListarProfesorComponent,
    CrearProfesorComponent,
    EditarProfesorComponent,
    ListarNotaComponent,
    CrearNotaComponent,
    EditarNotaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
