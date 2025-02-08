import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { AulaFlexServiceService } from './../../shared/aula-flex-service.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Inscricao } from 'src/app/shared/models';

@Component({
  selector: 'app-listar-inscricoes',
  templateUrl: './listar-inscricoes.component.html',
  styleUrls: ['./listar-inscricoes.component.css'],
})
export class ListarInscricoesComponent implements OnInit {
  public inscricoes: any[] = [];
  public pagedInscricoes: any[] = [];
  public colaborador: any;
  public currentPage: number = 1;
  public totalPages: number = 1;
  public pageSize: number = 5;
  public selectedInscricaoId: string | null = null;
  public statusMessage: string | null = null;

  constructor(
    private aulaFlexServiceService: AulaFlexServiceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.colaborador = this.authService.getJsonLocalStorage('colaborador');
    if (this.colaborador) {
      console.log('ID do Colaborador:', this.colaborador);
    }
    this.listarIncricoesPorcolaborador();
  }

  listarIncricoesPorcolaborador() {
    this.aulaFlexServiceService
      .listarInscricoesPorColaborador(this.colaborador)
      .subscribe(
        (inscricoes: Inscricao[]) => {
          this.inscricoes = inscricoes;
          this.totalPages = Math.ceil(this.inscricoes.length / this.pageSize);
          this.paginate();
        },
        (error) => {
          console.error('Erro ao carregar inscrições:', error);
        }
      );
  }


CancelarInscricao(inscricaoId: string) {
  this.statusMessage = null;  

  this.aulaFlexServiceService.cancelarInscricao(inscricaoId).subscribe(
    () => {
      this.statusMessage = 'Inscrição cancelada com sucesso!';
      this.inscricoes = this.inscricoes.filter(inscricao => inscricao.IdInscricao !== inscricaoId);
      this.paginate();
      setTimeout(() => {
          window.location.reload();
        }, 3000);
    },
    (error) => {
      this.statusMessage = 'Ocorreu um erro ao cancelar a inscrição. Tente novamente.';
      console.error('Erro ao cancelar a inscrição:', error);
    }
  );
}


  openModal(inscricaoId: string) {
    this.selectedInscricaoId = inscricaoId;
    const modalElement = document.getElementById('confirmModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

confirmCancel() {
  if (this.selectedInscricaoId) {
    this.CancelarInscricao(this.selectedInscricaoId);
    this.selectedInscricaoId = null;

    // Fechar o modal manualmente após a ação
    const modalElement = document.getElementById('confirmModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.hide();
    }
  }
}

  // Paginação
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
