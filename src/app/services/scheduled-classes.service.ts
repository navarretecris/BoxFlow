import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ScheduledClass {
  id_class: number;
  id_class_type: number;
  dia_semana: string;
  hora: string;
  cupo_maximo: number;
  duracion: number;
  id_instructor: number;
  nombre_tipo?: string;
  nombre_instructor?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduledClassesService {
  private url = 'http://localhost/BoxFlow/BackEnd/crud_scheduled_classes.php';


  constructor(private http: HttpClient) { }

  listar(): Observable<{ resultado: string; datos: ScheduledClass[] }> {
    return this.http.post<any>(this.url, {
      accion: 'listar',
    });
  }

  agregar(data: Omit<ScheduledClass, 'id_class'>): Observable<any> {
    return this.http.post<any>(this.url, {
      accion: 'agregar',
      ...data
    });
  }

  modificar(data: ScheduledClass): Observable<any> {
    return this.http.post<any>(this.url, {
      accion: 'modificar',
      ...data
    });
  }

  eliminar(id_class: number): Observable<any> {
    return this.http.post<any>(this.url, {
      accion: 'eliminar',
      id_class
    });
  }
}
