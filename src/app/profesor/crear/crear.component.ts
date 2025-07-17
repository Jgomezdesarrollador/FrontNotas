import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfesorCreateDto } from 'src/app/models/profesor.dto';
import { ProfesorService } from 'src/app/services/profesor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-profesor',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})

export class CrearComponent implements OnInit {
  profesorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profesorService: ProfesorService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.profesorForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit(): void {
    if (this.profesorForm.invalid) return;

    const nuevoProfesor: ProfesorCreateDto = this.profesorForm.value;

    this.profesorService.create(nuevoProfesor).subscribe({
      next: () => {
        this.mostrarMensaje('Profesor creado con éxito');
        this.router.navigate(['/profesores']);
      },
      error: err => {
        this.mostrarMensaje('Hubo un error al crear el profesor');
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
