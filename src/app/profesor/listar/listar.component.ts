import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProfesorDto } from 'src/app/models/profesor.dto';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-listar-profesor',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})

export class ListarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource: ProfesorDto[] = [];

  constructor(
    private profesorService: ProfesorService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarProfesores();
  }

  cargarProfesores(): void {
    this.profesorService.getAll().subscribe({
      next: (profesores) => {
        this.dataSource = profesores;
      },
      error: err => {
        this.mostrarMensaje('Error al obtener profesores');
        console.error(err);
      }
    });
  }

  editarProfesor(id: number): void {
    this.router.navigate(['/profesores/editar', id]);
  }

  eliminarProfesor(id: number): void {
    this.profesorService.delete(id).subscribe({
      next: () => {
        this.mostrarMensaje('Profesor Eliminado con éxito');
        this.dataSource = this.dataSource.filter(e => e.id !== id);
      },
      error: err => {
        this.mostrarMensaje('Error al eliminar profesor');
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
