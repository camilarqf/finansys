import { BaseResourceModel } from "src/app/shared/models/base-resource-model";

export class Categorias extends BaseResourceModel{
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string
  ){
    super();
  }
}
