import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-inscricoes',
  templateUrl: './listar-inscricoes.component.html',
  styleUrls: ['./listar-inscricoes.component.css']
})
export class ListarInscricoesComponent implements OnInit {
public inscricoes: any[] = [
  { categoria: "Artes Marciais", nome: "Muay Thay", dia: "Segunda", hora: "18h", dataInicio: "10/01/2025", dataFim: "10/02/2025", status: "Ativa" },
  { categoria: "Esportes", nome: "Futebol", dia: "Quarta", hora: "16h", dataInicio: "15/01/2025", dataFim: "15/03/2025", status: "Ativa" },
  { categoria: "Dança", nome: "Ballet", dia: "Terça", hora: "17h", dataInicio: "20/01/2025", dataFim: "20/04/2025", status: "Ativa" },
  { categoria: "Musculação", nome: "Treino Funcional", dia: "Sexta", hora: "19h", dataInicio: "25/01/2025", dataFim: "25/05/2025", status: "Ativa" }
];

  ngOnInit(): void {
  }
}
