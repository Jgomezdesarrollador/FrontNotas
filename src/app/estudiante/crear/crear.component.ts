import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EstudianteCreateDto } from 'src/app/models/estudiante.dto';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-crear-estudiante',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})

export class CrearComponent implements OnInit {
  estudianteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.estudianteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit(): void {
    if (this.estudianteForm.invalid) return;

    const nuevoEstudiante: EstudianteCreateDto = this.estudianteForm.value;

    this.estudianteService.create(nuevoEstudiante).subscribe({
      next: () => {
        this.mostrarMensaje('estudiante creado con éxito');
        this.router.navigate(['/estudiantes']);
      },
      error: err => {
        this.mostrarMensaje('Hubo un error al crear estudiante');
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
