export interface Horario {
  DiaSemana: string;
  Hora: string;
  IdHorario: string;
  VagasDisponiveis: number;
}

export interface Aula {
  idAula: string;
  nome: string;
  descricao: string;
}

export interface Inscricao {
  idAula: string,
  idHorario: string,
  idColaborador: string
  status: string;
  dataInicio: Date;
  dataFim: Date;
}

