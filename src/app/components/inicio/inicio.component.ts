import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { AulaFlexServiceService } from './../../shared/aula-flex-service.service';
import { ActivatedRoute } from '@angular/router';
import { Horario, Aula } from 'src/app/shared/models';
import { environment } from 'src/enviroments';
import { Inscricao } from 'src/app/shared/models';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  ltsaulas: any[] = [];
  error: string = '';
  diaSelecionado: string = '';
  horarioSelecionado: string = '';
  horariosDisponiveis: any[] = [];
  idAulaSelecionada: any;
  colaborador: any;

  constructor(
    private AulaFlexServiceService: AulaFlexServiceService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngAfterViewChecked(): void {
    this.scrollToFragment(); // Chama após as mudanças de visualização
  }

  ngOnInit(): void {
    this.colaborador = this.authService.getJsonLocalStorage('colaborador');

    if (this.colaborador?.idColaborador) {
      console.log('ID do Colaborador:', this.colaborador.idColaborador);
    }

    this.scrollToFragment();
    this.listarAulas();
  }

  carregarHorarios(idAula: any): void {
    this.AulaFlexServiceService.listarHorariosPorAula(idAula).subscribe(
      (horarios: Horario[]) => {
        this.horariosDisponiveis = horarios;
      },
      (error) => {
        console.error('Erro ao carregar horários:', error);
      }
    );
  }
  filtrarHorariosPorDia(dia: string) {
    return this.horariosDisponiveis.filter(
      (horario) => horario.DiaSemana === dia
    );
  }

  listarAulas(): void {
    this.AulaFlexServiceService.listarAulas().subscribe(
      (aulas) => {
        console.log(aulas);
        this.ltsaulas = aulas;
      },
      (error) => {
        this.error = 'Erro ao carregar as aulas';
      }
    );
  }

  aulasFiltradas(categoria: string): any[][] {
    const aulasFiltradasPorCategoria = this.ltsaulas
      .filter((aula) => aula.categoria === categoria)
      .sort((a, b) => a.nome.localeCompare(b.nome));

    return this.groupBy(aulasFiltradasPorCategoria);
  }

  groupBy(aulas: any[]): any[] {
    const grupos = [];
    for (let i = 0; i < aulas.length; i += 3) {
      grupos.push(aulas.slice(i, i + 3));
    }
    return grupos;
  }

  obterImagemPorAula(aulaNome: string): string {
    const imagem = `../../../assets/${aulaNome
      .toLowerCase()
      .replace(/\s+/g, '-')}.png`;
    return imagem;
  }

  inscrever() {
    const dataInicio = this.obterDataAtual();
    const dataFim = this.calcularDataFim(dataInicio);

    const command: Inscricao = {
      idColaborador: this.colaborador.idColaborador,
      idAula: this.idAulaSelecionada,
      idHorario: this.horarioSelecionado,
      dataInicio: dataInicio,
      dataFim: dataFim,
      status: 'Ativo',
    };

    this.AulaFlexServiceService.inscreverColaborador(command).subscribe(
      (response) => {
        console.log('Inscrição realizada com sucesso:', response);
      },
      (error) => {
        console.error('Erro na inscrição:', error);
      }
    );
  }

  obterDataAtual(): Date {
    const dataAtual = new Date();
    dataAtual.setUTCHours(0, 0, 0, 0);
    return new Date(dataAtual.toISOString());
  }

  calcularDataFim(dataInicio: Date): Date {
    const dataFim = new Date(dataInicio);
    dataFim.setMonth(dataFim.getMonth() + 1);
    return dataFim;
  }

  scrollToFragment() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth',
          });
        }
      }
    });
  }

  abrirModal(idAula: any): void {
    this.idAulaSelecionada = idAula;
    this.carregarHorarios(idAula);

    const modalElement = document.getElementById('modalDetalhes');
    if (modalElement) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
