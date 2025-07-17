import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteUpdateDto } from 'src/app/models/estudiante.dto';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-editar-estudiante',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})

export class EditarComponent implements OnInit {
  estudianteForm!: FormGroup;
  estudianteId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private estudianteService: EstudianteService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.estudianteId = Number(this.route.snapshot.paramMap.get('id'));

    this.estudianteForm = this.fb.group({
      id: [this.estudianteId],
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.estudianteService.getById(this.estudianteId).subscribe({
      next: (data) => this.estudianteForm.patchValue(data),
      error: err => {
        this.mostrarMensaje('Error al cargar estudiante');
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.estudianteForm.invalid) return;

    const estudianteActualizado: EstudianteUpdateDto = this.estudianteForm.value;

    this.estudianteService.update(this.estudianteId, estudianteActualizado).subscribe({
      next: () => {
        this.mostrarMensaje('Estudiante actualizado con éxito');
        this.router.navigate(['/estudiantes']);
      },
      error: err => {
        this.mostrarMensaje('Error al actualizar estudiante');
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
