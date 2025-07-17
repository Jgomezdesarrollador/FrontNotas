import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteDto } from 'src/app/models/estudiante.dto';
import { NotaUpdateDto } from 'src/app/models/nota.dto';
import { ProfesorDto } from 'src/app/models/profesor.dto';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { NotaService } from 'src/app/services/nota.service';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-editar-nota',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})

export class EditarComponent implements OnInit {
  notaForm!: FormGroup;
  notaId!: number;
  estudiantes: EstudianteDto[] = [];
  profesores: ProfesorDto[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notaService: NotaService,
    private estudianteService: EstudianteService,
    private profesorService: ProfesorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.notaId = Number(this.route.snapshot.paramMap.get('id'));

    this.notaForm = this.fb.group({
      id: [this.notaId],
      nombre: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0)]],
      idEstudiante: [null, Validators.required],
      idProfesor: [null, Validators.required]
    });

    this.notaService.getById(this.notaId).subscribe({
      next: (data) => this.notaForm.patchValue(data),
      error: (err) => console.error('Error al cargar nota', err)
    });

    this.estudianteService.getAll().subscribe({
      next: (data) => this.estudiantes = data,
      error: err => {
        this.mostrarMensaje('Error al cargar estudiantes');
        console.error(err);
      }
    });

    this.profesorService.getAll().subscribe({
      next: (data) => this.profesores = data,
      error: err => {
        this.mostrarMensaje('Error al cargar profesores');
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.notaForm.invalid) return;

    const notaActualizada: NotaUpdateDto = this.notaForm.value;

    this.notaService.update(this.notaId, notaActualizada).subscribe({
      next: () => {
        this.mostrarMensaje('Nota actualizada con éxito');
        this.router.navigate(['/notas']);
      },
      error: err => {
        this.mostrarMensaje('Error al actualizar nota');
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
