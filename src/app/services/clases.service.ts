import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ClassType {
  id_class_type: number;
  nombre: string;
}


@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  private url = 'http://localhost/BoxFlow/BackEnd/crud_class_types.php';
  private currentPage = 0;
  private pageSize = 10;

  constructor(private http: HttpClient) { }


  list(): Observable<ClassType[]> {
    return this.recuperarTodos(0);
  }

  recuperarTodos(page: number = 0, limit: number = this.pageSize): Observable<ClassType[]> {
    return this.http.post<ClassType[]>(this.url, {
      accion: 'listarTiposClase',
      pagina: page,
      limite: limit
    });
  }

  loadMore(): Observable<ClassType[]> {
    this.currentPage++;
    return this.recuperarTodos(this.currentPage);
  }

  getById(id: number): Observable<ClassType> {
    return this.http.post<ClassType>(this.url, {
      accion: 'obtenerTipoClase',
      id_class_type: id
    });
  }

  agregar(data: { nombre: string }): Observable<{ resultado: string; mensaje: string; id?: number }> {
    return this.http.post<any>(this.url, {
      accion: 'alta',
      nombre: data.nombre
    });
  }

  actualizar(data: ClassType): Observable<{ resultado: string; mensaje: string }> {
    return this.http.post<any>(this.url, {
      accion: 'modificacion',
      id_class_type: data.id_class_type,
      nombre: data.nombre
    });
  }

  eliminar(id: number): Observable<{ resultado: string; mensaje: string }> {
    return this.http.post<any>(this.url, {
      accion: 'baja',
      id_class_type: id
    });
  }
}
