import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Instructor {
  id_instructor: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class InstructorsService {
  private url = 'http://localhost/BoxFlow/BackEnd/crud_instructors.php';

  constructor(private http: HttpClient) {}

  listar(): Observable<{ resultado: string; datos: Instructor[] }> {
    return this.http.post<any>(this.url, {
      accion: 'listar',
    });
  }
}