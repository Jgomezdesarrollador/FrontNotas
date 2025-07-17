import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EstudianteDto } from 'src/app/models/estudiante.dto';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-listar-estudiante',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource: EstudianteDto[] = [];

  constructor(
    private estudianteService: EstudianteService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes(): void {
    this.estudianteService.getAll().subscribe({
      next: (estudiantes) => {
        this.dataSource = estudiantes;
      },
      error: err => {
        this.mostrarMensaje('Error al obtener estudiantes');
        console.error(err);
      }
    });
  }

  editarEstudiante(id: number): void {
    this.router.navigate(['/estudiantes/editar', id]);
  }

  eliminarEstudiante(id: number): void {
    this.estudianteService.delete(id).subscribe({
      next: () => {
        this.mostrarMensaje('Estudiante Eliminado con éxito');
        this.dataSource = this.dataSource.filter(e => e.id !== id);
      },
      error: err => {
        this.mostrarMensaje('Error al eliminar estudiante');
        console.error(err);
      }
    });
  }

  mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
