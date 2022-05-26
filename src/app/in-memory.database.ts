import { Categorias } from './pages/categorias/shared/categorias';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Entradas } from './pages/entradas/shared/entradas';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categorias: Categorias[] = [
      { id: 1, nome: 'Moradia', descricao: 'Pagamentos de conta da casa' },
      { id: 2, nome: 'Saúde', descricao: 'Plano de saúde e remédios' },
      { id: 3, nome: 'Lazer', descricao: 'Cinema, parque, praias e etc...' },
      { id: 4, nome: 'Salário', descricao: 'Recebimento de salário' },
      { id: 5, nome: 'Freelas', descricao: 'Trabalhos como freelancer' },
    ];

    const entradas: Entradas[] = [
      { id: 1, nome: 'Gás de Cozinha', categoriaId: categorias[0].id, categoria: categorias[0], pago: true, data: "14/10/2018", valor: "70,80", tipo: "despesa", descricao: "Qualquer descrição para essa despesa" } as unknown as Entradas,
      { id: 2, nome: 'Suplementos', categoriaId: categorias[1].id, categoria: categorias[1], pago: false, data: "14/10/2018", valor: "15,00", tipo: "despesa" } as unknown as Entradas,
      { id: 3, nome: 'Salário na Empresa X', categoriaId: categorias[3].id, categoria: categorias[3], pago: true, data: "15/10/2018", valor: "4405,49", tipo: "receita" } as unknown as Entradas,
      { id: 4, nome: 'Aluguel de Filme', categoriaId: categorias[2].id, categoria: categorias[2], pago: true, data: "16/10/2018", valor: "15,00", tipo: "despesa" } as unknown as Entradas,
      { id: 5, nome: 'Suplementos', categoriaId: categorias[1].id, categoria: categorias[1], pago: true, data: "17/10/2018", valor: "30,00", tipo: "despesa" } as unknown as Entradas,
      { id: 6, nome: 'Video Game da Filha', categoriaId: categorias[2].id, categoria: categorias[2], pago: false, data: "17/10/2018", valor: "15,00", tipo: "despesa" } as unknown as Entradas,
      { id: 11, nome: 'Uber', categoriaId: categorias[1].id, categoria: categorias[1], pago: true, data: "17/10/2018", valor: "30,00", tipo: "despesa" } as unknown as Entradas,
      { id: 12, nome: 'Aluguel', categoriaId: categorias[2].id, categoria: categorias[2], pago: false, data: "23/10/2018", valor: "15,00", tipo: "despesa" } as unknown as Entradas,
      { id: 13, nome: 'Gás de Cozinha', categoriaId: categorias[1].id, categoria: categorias[1], pago: false, data: "25/10/2018", valor: "30,00", tipo: "despesa" } as unknown as Entradas,
      { id: 14, nome: 'Pagamento Pelo Projeto XYZ', categoriaId: categorias[4].id, categoria: categorias[4], pago: true, data: "25/10/2018", valor: "2980,00", tipo: "receita" } as unknown as Entradas,
      { id: 19, nome: 'Aluguel de Filme', categoriaId: categorias[2].id, categoria: categorias[2], pago: false, data: "07/11/2018", valor: "15,00", tipo: "despesa" } as unknown as Entradas,
      { id: 21, nome: 'Video Game da Filha', categoriaId: categorias[1].id, categoria: categorias[1], pago: true, data: "17/11/2018", valor: "30,00", tipo: "despesa" } as unknown as Entradas,
      { id: 22, nome: 'Cinema', categoriaId: categorias[2].id, categoria: categorias[2], pago: true, data: "18/11/2018", valor: "15,00", tipo: "despesa" } as unknown as Entradas,
      { id: 23, nome: 'Jiu Jitsu', categoriaId: categorias[1].id, categoria: categorias[1], pago: false, data: "21/11/2018", valor: "130,00", tipo: "despesa" } as unknown as Entradas,
      { id: 44, nome: 'Uber', categoriaId: categorias[2].id, categoria: categorias[2], pago: true, data: "28/11/2018", valor: "15,00", tipo: "despesa" } as unknown as Entradas,
      { id: 55, nome: 'Cinema', categoriaId: categorias[1].id, categoria: categorias[1], pago: false, data: "28/11/2018", valor: "30,00", tipo: "despesa" } as unknown  as Entradas
    ]

    return {
      categorias : categorias,
      entradas : entradas
    }
  }
}
