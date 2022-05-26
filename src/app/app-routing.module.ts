import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'categorias',
    loadChildren: () =>
      import('./pages/categorias/categorias.module').then(
        (i) => i.CategoriasModule
      ),
  },
  {
    path: 'entradas',
    loadChildren: () =>
      import('./pages/entradas/entradas.module').then((i) => i.EntradasModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
