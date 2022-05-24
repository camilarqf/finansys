import { Categorias } from './categorias';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private apiPath: string = 'api/categorias';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Categorias[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handlerError), map(this.jsonDataToCategorias));
  }

  getById(id: number): Observable<Categorias> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handlerError), map(this.jsonDataToCategoria));
  }

  create(categoria: Categorias): Observable<Categorias> {
    return this.http
      .post(this.apiPath, categoria)
      .pipe(catchError(this.handlerError), map(this.jsonDataToCategoria));
  }

  update(categoria: Categorias): Observable<Categorias> {
    const url = `${this.apiPath}/${categoria.id}`;
    return this.http.put(url, categoria).pipe(
      catchError(this.handlerError),
      map(() => categoria) //retorna a categoria que foi recebida
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handlerError),
      map(() => null)
    );
  }

  private jsonDataToCategorias(jsonData: any[]): Categorias[] {
    const categorias: Categorias[] = [];
    jsonData.forEach((element) => categorias.push(element as Categorias));
    return jsonData;
  }

  private jsonDataToCategoria(jsonData: any): Categorias {
    return jsonData as Categorias;
  }

  private handlerError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO => ', error);
    return throwError(error);
  }
}
