import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstudianteDto, EstudianteCreateDto, EstudianteUpdateDto } from '../models/estudiante.dto';
import { environment } from 'src/environments/environment';
import { PagedResult } from '../models/pagination';

@Injectable({ providedIn: 'root' })
export class EstudianteService {
  private apiUrl = `${environment.apiUrl}/Estudiante`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<EstudianteDto[]> {
    return this.http.get<EstudianteDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<EstudianteDto> {
    return this.http.get<EstudianteDto>(`${this.apiUrl}/${id}`);
  }

  create(dto: EstudianteCreateDto): Observable<EstudianteDto> {
    return this.http.post<EstudianteDto>(this.apiUrl, dto);
  }

  update(id: number, dto: EstudianteUpdateDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPaged(page: number, size: number): Observable<PagedResult<EstudianteDto>> {
    const params = { page: page.toString(), size: size.toString() };
    return this.http.get<PagedResult<EstudianteDto>>(`${this.apiUrl}/paged`, { params });
  }

}
