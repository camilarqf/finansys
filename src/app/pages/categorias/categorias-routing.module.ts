import { CategoriasFormComponent } from './categorias-form/categorias-form.component';
import { CategoriasListaComponent } from './categorias-lista/categorias-lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CategoriasListaComponent
  },{
    path: 'novo',
    component: CategoriasFormComponent
  },{
    path: ':id/editar',
    component: CategoriasFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
