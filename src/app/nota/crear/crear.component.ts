import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudianteDto } from 'src/app/models/estudiante.dto';
import { NotaCreateDto } from 'src/app/models/nota.dto';
import { ProfesorDto } from 'src/app/models/profesor.dto';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { NotaService } from 'src/app/services/nota.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-nota',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  notaForm!: FormGroup;
  estudiantes: EstudianteDto[] = [];
  profesores: ProfesorDto[] = [];

  constructor(
    private fb: FormBuilder,
    private notaService: NotaService,
    private estudianteService: EstudianteService,
    private profesorService: ProfesorService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.notaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      valor: [0, [Validators.required, Validators.min(0), Validators.max(5.0)]],
      idEstudiante: [null, Validators.required],
      idProfesor: [null, Validators.required]
    });

    this.estudianteService.getAll().subscribe({
      next: (data) => this.estudiantes = data,
      error: (err) => console.error('Error al cargar estudiantes', err)
    });

    this.profesorService.getAll().subscribe({
      next: (data) => this.profesores = data,
      error: (err) => console.error('Error al cargar profesores', err)
    });
  }

  onSubmit(): void {
    if (this.notaForm.invalid) return;

    const nuevaNota: NotaCreateDto = this.notaForm.value;

    this.notaService.create(nuevaNota).subscribe({
      next: () => {
        this.mostrarMensaje('Nota registrada con éxito');
        this.router.navigate(['/notas']);
      },
      error: err => {
        this.mostrarMensaje('Hubo un error al registrar la nota');
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
