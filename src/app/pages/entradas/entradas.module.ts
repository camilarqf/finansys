import { NgModule } from '@angular/core';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';

import { SharedModule } from './../../shared/shared.module';
import { EntradasFormComponent } from './entradas-form/entradas-form.component';
import { EntradasListaComponent } from './entradas-lista/entradas-lista.component';
import { EntradasRoutingModule } from './entradas-routing.module';

@NgModule({
  declarations: [EntradasListaComponent, EntradasFormComponent],
  imports: [
    EntradasRoutingModule,
    CalendarModule,
    IMaskModule,
    SharedModule
  ],
})
export class EntradasModule {}
