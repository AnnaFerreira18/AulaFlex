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

  constructor(private aulaFlexServiceService: AulaFlexServiceService, private authService: AuthService) {}

  public inscricoes: any[] = [];
  public ltsInscricoes: any[] = [];

  public colaborador: any;

  ngOnInit(): void {
    this.colaborador = this.authService.getJsonLocalStorage('colaborador');

    if (this.colaborador?.idColaborador) {
      console.log('ID do Colaborador:', this.colaborador.idColaborador);
    }
    this.listarIncricoesPorcolaborador();
  }

listarIncricoesPorcolaborador() {
  this.aulaFlexServiceService.listarInscricoesPorColaborador(
    this.colaborador.idColaborador
  ).subscribe(
    (inscricoes: Inscricao[]) => {
      console.log(inscricoes); // Verifique se aqui está vindo corretamente
      this.inscricoes = inscricoes;
    },
    (error) => {
      console.error('Erro ao carregar inscrições:', error);
    }
  );
}

}
