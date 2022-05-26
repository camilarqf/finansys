import { Categorias } from './../../categorias/shared/categorias';
export class Entradas {
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string,
    public tipo?: string,
    public valor?: number,
    public data?: string,
    public pago?: boolean,
    public categoriaId?: number,
    public categoria?: Categorias
  ){}

  static tipos ={
    despesa: 'Despesa',
    receita: 'Receita'
  }

  getPagoText(): string{
    return this.pago ? 'Pago' : 'Pendente';
  }
}
