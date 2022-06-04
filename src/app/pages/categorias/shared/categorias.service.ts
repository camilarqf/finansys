import { Categorias } from './categorias';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService extends BaseResourceService<Categorias>{
 
  constructor(protected injector: Injector) {
    super("api/categorias",injector);
  }



}
