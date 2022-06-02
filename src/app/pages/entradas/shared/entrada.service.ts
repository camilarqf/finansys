import { CategoriasService } from './../../categorias/shared/categorias.service';
import { Entradas } from './entradas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EntradasService {
  private apiPath: string = 'api/entradas';

  constructor(
    private http: HttpClient,
    private categoriaService: CategoriasService
  ) {}

  getAll(): Observable<Entradas[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handlerError), map(this.jsonDataToEntradas));
  }

  getById(id: number): Observable<Entradas> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handlerError), map(this.jsonDataToEntrada));
  }

  create(entrada: Entradas): Observable<Entradas> {
    return this.categoriaService.getById(entrada.categoriaId).pipe(
      flatMap((response) => {
        entrada.categoria = response;

        return this.http
          .post(this.apiPath, entrada)
          .pipe(catchError(this.handlerError), map(this.jsonDataToEntrada));
      })
    );
  }

  update(entrada: Entradas): Observable<Entradas> {
    const url = `${this.apiPath}/${entrada.id}`;

     return this.categoriaService.getById(entrada.categoriaId).pipe(
      flatMap((response) => {
        entrada.categoria = response;

        return this.http.put(url, entrada).pipe(
          catchError(this.handlerError),
          map(() => entrada) //retorna a entrada que foi recebida
        );
      })
    );

  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handlerError),
      map(() => null)
    );
  }

  private jsonDataToEntradas(jsonData: any[]): Entradas[] {
    const entradas: Entradas[] = [];
    jsonData.forEach((element) => {
      const entrada = Object.assign(new Entradas(), element);
      entradas.push(entrada);
    });
    return entradas;
  }

  private jsonDataToEntrada(jsonData: any): Entradas {
    return Object.assign(new Entradas(), jsonData);
  }

  private handlerError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO => ', error);
    return throwError(error);
  }
}
