import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategoriasFormComponent } from './categorias-form/categorias-form.component';
import { CategoriasListaComponent } from './categorias-lista/categorias-lista.component';
import { CategoriasRoutingModule } from './categorias-routing.module';


@NgModule({
  declarations: [
    CategoriasListaComponent,
    CategoriasFormComponent,

  ],
  imports: [
    CategoriasRoutingModule,
    SharedModule
  ]
})
export class CategoriasModule { }
