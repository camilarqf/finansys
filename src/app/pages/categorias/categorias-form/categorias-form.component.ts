import { CategoriasService } from './../shared/categorias.service';
import { Categorias } from './../shared/categorias';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias-form.component.html',
  styleUrls: ['./categorias-form.component.css'],
})
export class CategoriasFormComponent implements OnInit, AfterContentChecked {
  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  categoria: Categorias = new Categorias();

  constructor(
    private categoriaService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if ((this.currentAction == 'novo')) {
      this.createCategoria();
    } else {
      this.editCategoria();
    }
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'novo') {
      this.currentAction = 'novo';
    } else {
      this.currentAction = 'editar';
    }
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null],
    });
  }

  private loadCategory() {
    if (this.currentAction == 'editar') {
      this.route.paramMap
        .pipe(
          switchMap((params) =>
            this.categoriaService.getById(+params.get('id'))
          )
        )
        .subscribe(
          (response) => {
            this.categoria = response;
            this.categoryForm.patchValue(response);
          },
          (error) => {
            alert('Ocorreu um erro no servidor, tente novamente mais tarde');
          }
        );
    }
  }

  private setPageTitle() {
    if (this.currentAction == 'novo') {
      this.pageTitle = 'Cadastro de Nova Categoria';
    } else {
      const categoryName = this.categoria.nome || '';
      this.pageTitle = 'Editando Categoria: ' + categoryName;
    }
  }

  createCategoria() {
    const categoria: Categorias = Object.assign(
      new Categorias(),
      this.categoryForm.value
    );

    this.categoriaService.create(categoria).subscribe(
      (response) => {
        console.log(response)
        this.actionsForSuccess(response);
      },
      (error) => {
        this.actionsForError(error);
      }
    );
  }

  editCategoria() {
    const categoria: Categorias = Object.assign(
      new Categorias(),
      this.categoryForm.value
    );
    this.categoriaService.update(categoria).subscribe(
      (response) => {
        console.log(response)
        this.actionsForSuccess(response);
      },
      (error) => {
        this.actionsForError(error);
      }
    );
  }

  private actionsForSuccess(categoria: Categorias) {
    this.toastr.success('Solicitação processada com sucesso!');
    this.router.navigateByUrl('categorias', { skipLocationChange: true }).then(
      //forçar reload da página
      () => this.router.navigate(['categorias', categoria.id, 'editar'])
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
