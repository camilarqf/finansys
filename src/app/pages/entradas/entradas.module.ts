import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradasRoutingModule } from './entradas-routing.module';
import { EntradasListaComponent } from './entradas-lista/entradas-lista.component';


@NgModule({
  declarations: [
    EntradasListaComponent
  ],
  imports: [
    CommonModule,
    EntradasRoutingModule
  ]
})
export class EntradasModule { }
