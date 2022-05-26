import { EntradasFormComponent } from './entradas-form/entradas-form.component';
import { EntradasListaComponent } from './entradas-lista/entradas-lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EntradasListaComponent
  },{
    path: 'novo',
    component: EntradasFormComponent
  },{
    path: ':id/editar',
    component: EntradasFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradasRoutingModule { }
