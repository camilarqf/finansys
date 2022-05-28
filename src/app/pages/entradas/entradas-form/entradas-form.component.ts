import { CategoriasService } from './../../categorias/shared/categorias.service';
import { Categorias } from './../../categorias/shared/categorias';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { locale } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { EntradasService } from '../shared/entrada.service';
import { Entradas } from '../shared/entradas';

@Component({
  selector: 'app-entradas-form',
  templateUrl: './entradas-form.component.html',
  styleUrls: ['./entradas-form.component.css']
})
export class EntradasFormComponent implements OnInit, AfterContentChecked {
  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  entrada: Entradas = new Entradas();
  categoria: Categorias[] = [];

  imaskConfig ={
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ',',

  }

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }

  constructor(
    private entradaService: EntradasService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private categoriaService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
    this.loadCategory();
  }



  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if ((this.currentAction == 'novo')) {
      this.createEntrada();
    } else {
      this.editEntrada();
    }
  }

  get typeOptions(): Array<any>{
    return Object.entries(Entradas.tipos).map(
      ([value, text]) =>{
        return {
          text: text,
          value: value
        }
      }
    )
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'novo') {
      this.currentAction = 'novo';
    } else {
      this.currentAction = 'editar';
    }
  }

  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null],
      tipo: ['despesa',  [Validators.required]],
      valor: [null,  [Validators.required]],
      data: [null,  [Validators.required]],
      pago: [true,  [Validators.required]],
      categoriaId: [null,  [Validators.required]]
    });
  }

  private loadEntry() {
    if (this.currentAction == 'editar') {
      this.route.paramMap
        .pipe(
          switchMap((params) =>
            this.entradaService.getById(+params.get('id'))
          )
        )
        .subscribe(
          (response) => {
            this.entrada = response;
            this.entryForm.patchValue(response);
          },
          (error) => {
            alert('Ocorreu um erro no servidor, tente novamente mais tarde');
          }
        );
    }

  }

 private loadCategory() {
    this.categoriaService.getAll().subscribe(response =>{
      this.categoria = response;
    })
  }


  private setPageTitle() {
    if (this.currentAction == 'novo') {
      this.pageTitle = 'Cadastro de Novo Lançamento';
    } else {
      const entryName = this.entrada.nome || '';
      this.pageTitle = 'Editando Lançamento: ' + entryName;
    }
  }

  createEntrada() {
    const entrada: Entradas = Object.assign(
      new Entradas(),
      this.entryForm.value
    );

    this.entradaService.create(entrada).subscribe(
      (response) => {
        console.log(response)
        this.actionsForSuccess(response);
      },
      (error) => {
        this.actionsForError(error);
      }
    );
  }

  editEntrada() {
    const entrada: Entradas = Object.assign(
      new Entradas(),
      this.entryForm.value
    );
    this.entradaService.update(entrada).subscribe(
      (response) => {
        console.log(response)
        this.actionsForSuccess(response);
      },
      (error) => {
        this.actionsForError(error);
      }
    );
  }

  private actionsForSuccess(entrada: Entradas) {
    this.toastr.success('Solicitação processada com sucesso!');
    this.router.navigateByUrl('entradas', { skipLocationChange: true }).then(
      //forçar reload da página
      () => this.router.navigate(['entradas', entrada.id, 'editar'])
    );
  }

  private actionsForError(error) {
    this.toastr.error('Ocorreu um erro ao processar a sua solicitação');

    this.submittingForm = false;

    if (error.status === 422) {
      //erro do lado do front
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = [
        'Falha na comunicação com o servidor. Por favor, tente mais tarde',
      ];
    }
  }
}
