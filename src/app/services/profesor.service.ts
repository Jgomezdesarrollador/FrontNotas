import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfesorDto, ProfesorCreateDto, ProfesorUpdateDto } from '../models/profesor.dto';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfesorService {
  private apiUrl = `${environment.apiUrl}/Profesor`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProfesorDto[]> {
    return this.http.get<ProfesorDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<ProfesorDto> {
    return this.http.get<ProfesorDto>(`${this.apiUrl}/${id}`);
  }

  create(dto: ProfesorCreateDto): Observable<ProfesorDto> {
    return this.http.post<ProfesorDto>(this.apiUrl, dto);
  }

  update(id: number, dto: ProfesorUpdateDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
