import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesorUpdateDto } from 'src/app/models/profesor.dto';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-editar-profesor',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})

export class EditarComponent implements OnInit {
  profesorForm!: FormGroup;
  profesorId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private profesorService: ProfesorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.profesorId = Number(this.route.snapshot.paramMap.get('id'));

    this.profesorForm = this.fb.group({
      id: [this.profesorId],
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.profesorService.getById(this.profesorId).subscribe({
      next: (data) => this.profesorForm.patchValue(data),
      error: err => {
        this.mostrarMensaje('Error al cargar profesor');
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.profesorForm.invalid) return;

    const profesorActualizado: ProfesorUpdateDto = this.profesorForm.value;

    this.profesorService.update(this.profesorId, profesorActualizado).subscribe({
      next: () => {
        this.mostrarMensaje('Profesor actualizado con éxito');
        this.router.navigate(['/profesores']);
      },
      error: err => {
        this.mostrarMensaje('Error al actualizar profesor');
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
