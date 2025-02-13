import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AulaFlexServiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  listarAulas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listarAulas`);
  }

  listarHorariosPorAula(aulaId: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.apiUrl}/listarHorarios/?aulaId=${aulaId}`, {
      headers,
    });
  }

  listarInscricoesPorColaborador(idColaborador: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.apiUrl}/inscricoes/${idColaborador}`, {
      headers,
    });
  }

  inscreverColaborador(command: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post(
      `${this.apiUrl}/inscrever/${command.idColaborador}/${command.idAula}/${command.idHorario}`,
      command,
      { headers }
    );
  }

  cancelarInscricao(inscricaoId: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete(`${this.apiUrl}/cancelar/${inscricaoId}`, {
      headers,
    });
  }

  checarEmailDuplicado(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/checarEmailDuplicado/${email}`);
  }

  criarConta(command: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/colaborador/criarConta`, command);
  }

  enviarEmailRedefinirSenha(email: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/colaborador/enviarEmailRedefinirSenha`,
      email
    );
  }

  redefinirSenha(email: string, chave: string, command: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/colaborador/redefinirSenha/${email}/${chave}`,
      command
    );
  }

  verificarInscricaoExistente(
    colaboradorId: string,
    aulaId: string,
    horarioId: string
  ): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/verificar/${colaboradorId}/${aulaId}/${horarioId}`
    );
  }

  totalInscricoesPorCategoria(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categoriasAulas`);
  }

  verificarDisponibilidade(aulaId: string, horarioId: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/verificarDisponibilidade/${aulaId}/${horarioId}`
    );
  }

  alterarVagas(
    idAula: string,
    idHorario: string,
    realizarInscricao: boolean
  ): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/alterar-inscricao/${idAula}/${idHorario}?realizarInscricao=${realizarInscricao}`,
      null
    );
  }
}
