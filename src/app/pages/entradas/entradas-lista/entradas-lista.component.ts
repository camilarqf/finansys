import { Component, OnInit } from '@angular/core';
import { EntradasService } from '../shared/entrada.service';
import { Entradas } from '../shared/entradas';

@Component({
  selector: 'app-entradas-lista',
  templateUrl: './entradas-lista.component.html',
  styleUrls: ['./entradas-lista.component.css']
})
export class EntradasListaComponent implements OnInit {

  entradas: Entradas[] = [];
  constructor(private entradaService: EntradasService) { }

  ngOnInit(): void {
    this.entradaService.getAll().subscribe(
      (response) => {
        this.entradas = response.sort((a,b) => b.id - a.id);
      },
      (error) => alert('Erro ao carregar lista')
    );
  }

  deleteEntrada(entradas: any) {
    const deveDeletar = confirm('Deseja realmente excluir esse item?');

    if (deveDeletar) {
      this.entradaService.delete(entradas.id).subscribe(
        () =>
          (this.entradas = this.entradas.filter(
            (element) => element != entradas
          )),
        () => alert('Erro ao tentar excluir')
      );
    }
  }

}
