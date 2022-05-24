import { CategoriasService } from './../shared/categorias.service';
import { Categorias } from './../shared/categorias';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
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

  private loadCategory(){
    if(this.currentAction == "editar"){
      this.route.paramMap.pipe(
        switchMap(params => this.categoriaService.getById(+params.get("id")))
      ).subscribe(response =>{
        this.categoria = response;
        this.categoryForm.patchValue(response)
      }, (error => {
        alert("Ocorreu um erro no servidor, tente novamente mais tarde")
      }))
    }
  }

  private setPageTitle(){
    if(this.currentAction = "novo"){
      this.pageTitle = "Cadastro de Nova Categoria"
    }else{
      const categoryName = this.categoria.nome || ""
      this.pageTitle = "Editando Categoria: " + categoryName;
    }
  }


}
