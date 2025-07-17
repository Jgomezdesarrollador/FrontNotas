import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotaDto, NotaCreateDto, NotaUpdateDto } from '../models/nota.dto';
import { environment } from 'src/environments/environment';
import { PagedResult } from '../models/pagination';

@Injectable({ providedIn: 'root' })
export class NotaService {
  private apiUrl = `${environment.apiUrl}/Nota`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<NotaDto[]> {
    return this.http.get<NotaDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<NotaDto> {
    return this.http.get<NotaDto>(`${this.apiUrl}/${id}`);
  }

  create(dto: NotaCreateDto): Observable<NotaDto> {
    return this.http.post<NotaDto>(this.apiUrl, dto);
  }

  update(id: number, dto: NotaUpdateDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPaged(page: number, size: number): Observable<PagedResult<NotaDto>> {
    const params = { page: page.toString(), size: size.toString() };
    return this.http.get<PagedResult<NotaDto>>(`${this.apiUrl}/paged`, { params });
  }
}
