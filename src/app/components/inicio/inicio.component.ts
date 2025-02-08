import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { AulaFlexServiceService } from './../../shared/aula-flex-service.service';
import { ActivatedRoute } from '@angular/router';
import { Horario, Aula } from 'src/app/shared/models';
import { environment } from 'src/enviroments';
import { Inscricao } from 'src/app/shared/models';
import { Modal } from 'bootstrap';

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
  inscricaoRealizada: boolean = false;
  inscricaoExistente: boolean = false;

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

    this.scrollToFragment();
    this.listarAulas();

    console.log(this.colaborador);

    if (this.colaborador) {
      console.log('ID do Colaborador:', this.colaborador);
    }
  }

  carregarHorarios(idAula: any): void {
    this.AulaFlexServiceService.listarHorariosPorAula(idAula).subscribe(
      (horarios: Horario[]) => {
        console.log(horarios);

        const horariosAgrupados = this.agruparPorDia(horarios);

        this.horariosDisponiveis = horariosAgrupados;
      },
      (error) => {
        console.error('Erro ao carregar horários:', error);
      }
    );
  }

  agruparPorDia(horarios: Horario[]): any[] {
    const horariosPorDia: any[] = [];

    horarios.forEach((horario) => {
      const diaSemana = horario.DiaSemana;

      const diaExistente = horariosPorDia.find(
        (item) => item.dia === diaSemana
      );
      if (diaExistente) {
        diaExistente.horarios.push(horario);
      } else {
        horariosPorDia.push({ dia: diaSemana, horarios: [horario] });
      }
    });

    return horariosPorDia;
  }

  filtrarHorariosPorDia(dia: string) {
    const horariosDoDia = this.horariosDisponiveis.find(
      (item) => item.dia === dia
    );
    return horariosDoDia ? horariosDoDia.horarios : [];
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
      idColaborador: this.colaborador,
      idAula: this.idAulaSelecionada,
      idHorario: this.horarioSelecionado,
      dataInicio: dataInicio,
      dataFim: dataFim,
      status: 'Ativo',
    };

    this.AulaFlexServiceService.inscreverColaborador(command).subscribe(
      (response) => {
        this.inscricaoRealizada = true;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        console.log('Inscrição realizada com sucesso:', response);
      },
      (error) => {
        console.error('Erro na inscrição:', error);
      }
    );
  }

  verificarInscricao() {
    if (this.idAulaSelecionada && this.horarioSelecionado && this.colaborador) {
      this.AulaFlexServiceService.verificarInscricaoExistente(
        this.colaborador,
        this.idAulaSelecionada,
        this.horarioSelecionado
      ).subscribe(
        (inscricaoExistente) => {
          if (inscricaoExistente) {
            this.error = 'Você já está inscrito nessa aula.';
            this.inscricaoExistente = true;
            return;
          }

          this.AulaFlexServiceService.listarInscricoesPorColaborador(
            this.colaborador
          ).subscribe(
            (inscricoes) => {
              const diaSelecionado = this.diaSelecionado;
              const horarioSelecionado = this.horarioSelecionado;

              const inscricoesAtivas = inscricoes.filter(
                (inscricao: any) => inscricao.Status === 'Ativo'
              );

              const inscricoesNoMesmoDia = inscricoesAtivas.filter(
                (inscricao: any) => inscricao.DiaSemana === diaSelecionado
              );

              if (inscricoesNoMesmoDia.length >= 2) {
                this.error =
                  'Você já possui duas inscrições para este dia da semana.';
                this.inscricaoExistente = true;
                return;
              }

              const horarioExistente = inscricoesNoMesmoDia.some(
                (inscricao: any) => inscricao.Hora === horarioSelecionado
              );

              if (horarioExistente) {
                this.error = 'Você já possui uma inscrição neste horário.';
                this.inscricaoExistente = true;
                return;
              }

              this.error = '';
              this.inscricaoExistente = false;
            },
            (error) => {
              console.error('Erro ao listar inscrições:', error);
              this.error = 'Erro ao listar inscrições.';
            }
          );
        },
        (error) => {
          console.error('Erro ao verificar inscrição:', error);
          this.error = 'Erro ao verificar inscrição.';
          this.inscricaoExistente = false;
        }
      );
    }
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
    if (!this.colaborador) {
      this.inscricaoRealizada = false;
      this.error = '';
      const modalElement = document.getElementById('modalDetalhes');
      if (modalElement) {
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show();
      }
    } else {
      this.diaSelecionado = '';
      this.horarioSelecionado = '';
      this.error = '';
      this.inscricaoRealizada = false;

      this.idAulaSelecionada = idAula;
      this.carregarHorarios(idAula);

      const modalElement = document.getElementById('modalDetalhes');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    }
  }
}
