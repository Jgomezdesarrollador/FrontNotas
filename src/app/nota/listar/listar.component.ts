import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotaDto } from 'src/app/models/nota.dto';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-listar-nota',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'valor', 'estudiante', 'profesor', 'acciones'];
  dataSource: NotaDto[] = [];

  constructor(
    private notaService: NotaService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarNotas();
  }

  cargarNotas(): void {
    this.notaService.getAll().subscribe({
      next: (notas) => {
        this.dataSource = notas;
      },
      error: err => {
        this.mostrarMensaje('Error al obtener notas');
        console.error(err);
      }
    });
  }

  editarNota(id: number): void {
    this.router.navigate(['/notas/editar', id]);
  }

  eliminarNota(id: number): void {
    this.notaService.delete(id).subscribe({
      next: () => {
        this.mostrarMensaje('Nota Eliminado con éxito');
        this.dataSource = this.dataSource.filter(n => n.id !== id);
      },
      error: err => {
        this.mostrarMensaje('Error al eliminar nota');
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
