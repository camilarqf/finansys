import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradasRoutingModule } from './entradas-routing.module';
import { EntradasListaComponent } from './entradas-lista/entradas-lista.component';
import { EntradasFormComponent } from './entradas-form/entradas-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

@NgModule({
  declarations: [EntradasListaComponent, EntradasFormComponent],
  imports: [
    CommonModule,
    EntradasRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule
  ],
})
export class EntradasModule {}
