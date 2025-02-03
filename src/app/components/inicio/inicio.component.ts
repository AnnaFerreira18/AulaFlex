import { Component, OnInit } from '@angular/core';
import { AulaFlexServiceService } from './../../shared/aula-flex-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  aulas: any[] = [];  // Variável para armazenar as aulas
  loading: boolean = true;  // Variável para controlar o estado de carregamento
  error: string = '';  // Para armazenar mensagens de erro

  constructor(private AulaFlexServiceService: AulaFlexServiceService) {}

  ngOnInit(): void {
    this.listarAulas();
  }

  listarAulas(): void {
    this.AulaFlexServiceService.listarAulas().subscribe(
      (response) => {
        console.log(response)
        this.aulas = response;  // Armazena as aulas na variável
        this.loading = false;    // Desliga o estado de carregamento
      },
      (error) => {
        this.error = 'Erro ao carregar as aulas';  // Exibe a mensagem de erro
        this.loading = false;
      }
    );
  }

  selectedAula: any = null;

abrirModal() {
  const modalElement = document.getElementById('modalDetalhes');
  if (modalElement) {
    const modal = new window.bootstrap.Modal(modalElement);  // Acesso direto à classe Modal do Bootstrap
    modal.show();  // Exibe a modal
  }
}

}
