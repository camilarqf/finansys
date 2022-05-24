import { CategoriasService } from './../shared/categorias.service';
import { Categorias } from './../shared/categorias';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias-lista',
  templateUrl: './categorias-lista.component.html',
  styleUrls: ['./categorias-lista.component.css'],
})
export class CategoriasListaComponent implements OnInit {
  categorias: Categorias[] = [];

  constructor(private categoriaService: CategoriasService) {}

  ngOnInit(): void {
    this.categoriaService.getAll().subscribe(
      (response) => {
        this.categorias = response;
      },
      (error) => alert('Erro ao carregar lista')
    );
  }

  deleteCategoria(categorias: any) {
    const deveDeletar = confirm('Deseja realmente excluir esse item?');

    if (deveDeletar) {
      this.categoriaService.delete(categorias.id).subscribe(
        () =>
          (this.categorias = this.categorias.filter(
            (element) => element != categorias
          )),
        () => alert('Erro ao tentar excluir')
      );
    }
  }
}
