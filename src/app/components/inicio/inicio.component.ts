import { Component, OnInit } from '@angular/core';
import { AulaFlexServiceService } from './../../shared/aula-flex-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  aulas: any[] = [];
  error: string = '';
diasDisponiveis: string[] = ['Segunda-feira', 'Terça-feira', 'Quarta-feira'];
  diaSelecionado: string = '';
  horarioSelecionado: string = '';
  horariosDisponiveis: { horario: string, vagas: number }[] = [];

  // Simulação de horários e vagas para cada dia
 horariosPorDia: { [key: string]: { horario: string, vagas: number }[] } = {
    'Segunda-feira': [
      { horario: '08:00', vagas: 5 },
      { horario: '10:00', vagas: 0 }, // Sem vagas
      { horario: '14:00', vagas: 7 }
    ],
    'Terça-feira': [
      { horario: '09:00', vagas: 6 },
      { horario: '13:00', vagas: 0 }, // Sem vagas
      { horario: '16:00', vagas: 4 }
    ],
    'Quarta-feira': [
      { horario: '07:30', vagas: 8 },
      { horario: '11:30', vagas: 0 }, // Sem vagas
      { horario: '15:30', vagas: 3 }
    ]
  };

  constructor(
    private AulaFlexServiceService: AulaFlexServiceService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewChecked(): void {
    this.scrollToFragment(); // Chama após as mudanças de visualização
  }

  ngOnInit(): void {
    this.scrollToFragment();
    this.listarAulas();
  }


carregarHorarios() {
    if (this.diaSelecionado) {
      this.horariosDisponiveis = this.horariosPorDia[this.diaSelecionado];
      this.horarioSelecionado = ''; // Resetar a seleção de horário
    } else {
      this.horariosDisponiveis = [];
    }
  }

  inscrever() {
    if (!this.diaSelecionado || !this.horarioSelecionado) {
      alert('Selecione um dia e um horário!');
      return;
    }
    alert(`Inscrição confirmada para ${this.diaSelecionado} às ${this.horarioSelecionado}`);
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
  listarAulas(): void {
    this.AulaFlexServiceService.listarAulas().subscribe(
      (response) => {
        console.log(response);
        this.aulas = response;
      },
      (error) => {
        this.error = 'Erro ao carregar as aulas';
      }
    );
  }

  selectedAula: any = null;

  abrirModal() {
    const modalElement = document.getElementById('modalDetalhes');
    if (modalElement) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  aulasFiltradas(categoria: string): any[][] {
    const aulasFiltradasPorCategoria = this.aulas
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
}
