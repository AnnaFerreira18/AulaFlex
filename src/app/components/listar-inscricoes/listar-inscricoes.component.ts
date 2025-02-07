import { Inscricao } from 'src/app/shared/models';
import { AulaFlexServiceService } from './../../shared/aula-flex-service.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-listar-inscricoes',
  templateUrl: './listar-inscricoes.component.html',
  styleUrls: ['./listar-inscricoes.component.css'],
})
export class ListarInscricoesComponent implements OnInit {
  constructor(
    private aulaFlexServiceService: AulaFlexServiceService,
    private authService: AuthService
  ) {}

  public inscricoes: any[] = [];
  public pagedInscricoes: any[] = [];
  public colaborador: any;
  public currentPage: number = 1;
  public totalPages: number = 1;
  public pageSize: number = 5;

  ngOnInit(): void {
    this.colaborador = this.authService.getJsonLocalStorage('colaborador');

    if (this.colaborador?.idColaborador) {
      console.log('ID do Colaborador:', this.colaborador.idColaborador);
    }
    this.listarIncricoesPorcolaborador();
  }

  listarIncricoesPorcolaborador() {
    this.aulaFlexServiceService
      .listarInscricoesPorColaborador(this.colaborador.idColaborador)
      .subscribe(
        (inscricoes: Inscricao[]) => {
          console.log(inscricoes);
          this.inscricoes = inscricoes;
          this.totalPages = Math.ceil(this.inscricoes.length / this.pageSize);
          this.paginate();
        },
        (error) => {
          console.error('Erro ao carregar inscrições:', error);
        }
      );
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedInscricoes = this.inscricoes.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }
}
