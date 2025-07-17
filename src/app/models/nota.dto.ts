export interface NotaDto {
  id: number;
  nombre: string;
  valor: number;

  idEstudiante: number;
  nombreEstudiante: string;

  idProfesor: number;
  nombreProfesor: string;
}

export interface NotaCreateDto {
  nombre: string;
  valor: number;
  idEstudiante: number;
  idProfesor: number;
}

export interface NotaUpdateDto {
  id: number;
  nombre: string;
  valor: number;
  idEstudiante: number;
  idProfesor: number;
}
