import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './estudiante/listar/listar.component';
import { CrearComponent } from './estudiante/crear/crear.component';
import { EditarComponent } from './estudiante/editar/editar.component';
import { ListarComponent as ListarProfesorComponent } from './profesor/listar/listar.component';
import { CrearComponent as CrearProfesorComponent } from './profesor/crear/crear.component';
import { EditarComponent as EditarProfesorComponent } from './profesor/editar/editar.component';
import { ListarComponent as ListarNotaComponent } from './nota/listar/listar.component';
import { CrearComponent as CrearNotaComponent } from './nota/crear/crear.component';
import { EditarComponent as EditarNotaComponent } from './nota/editar/editar.component';

const routes: Routes = [
  { path: 'estudiantes', component: ListarComponent },
  { path: 'estudiantes/crear', component: CrearComponent },
  { path: 'estudiantes/editar/:id', component: EditarComponent },
  { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
  { path: 'profesores', component: ListarProfesorComponent },
  { path: 'profesores/crear', component: CrearProfesorComponent },
  { path: 'profesores/editar/:id', component: EditarProfesorComponent },
  { path: 'notas', component: ListarNotaComponent },
  { path: 'notas/crear', component: CrearNotaComponent },
  { path: 'notas/editar/:id', component: EditarNotaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
