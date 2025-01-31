import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments';

@Injectable({
  providedIn: 'root'
})
export class AulaFlexServiceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  listarAulas(): Observable<any> {
     return this.http.get(`${this.apiUrl}/listarAulas`);
   }

  listarHorariosPorAula(aulaId: string): Observable<any> {
     return this.http.get(`${this.apiUrl}/listarHorarios/?aulaId=${aulaId}`);
   }

  listarInscricoesPorColaborador(idColaborador: string): Observable<any> {
     return this.http.get(`${this.apiUrl}/inscricoes/${idColaborador}`);
   }

  totalInscricoesPorCategoria(): Observable<any> {
     return this.http.get(`${this.apiUrl}/categoriasAulas`);
   }

  verificarDisponibilidade(aulaId: string, horarioId: string): Observable<any> {
     return this.http.get(`${this.apiUrl}/verificarDisponibilidade/${aulaId}/${horarioId}`);
   }

  inscreverColaborador(command: any): Observable<any> {
     return this.http.post(`${this.apiUrl}/inscrever/${command.idColaborador}/${command.idAula}/${command.idHorario}`, command);
   }

  cancelarInscricao(inscricaoId: string): Observable<any> {
     return this.http.delete(`${this.apiUrl}/cancelar/${inscricaoId}`);
   }

  loginGoogle(): Observable<any> {
     return this.http.get(`${this.apiUrl}/colaborador/login-google`);
   }

  loginFacebook(): Observable<any> {
     return this.http.get(`${this.apiUrl}/colaborador/login-facebook`);
   }

  checarEmailDuplicado(email: string): Observable<any> {
     return this.http.get(`${this.apiUrl}/checarEmailDuplicado/${email}`);
   }

  criarConta(command: any): Observable<any> {
     return this.http.post(`${this.apiUrl}/colaborador/criarConta`, command);
   }

  enviarEmailRedefinirSenha(command: any): Observable<any> {
     return this.http.post(`${this.apiUrl}/colaborador/enviarEmailRedefinirSenha`, command);
   }

  redefinirSenha(email: string, token: string, command: any): Observable<any> {
     return this.http.put(`${this.apiUrl}/colaborador/redefinirSenha/${email}/${token}`, command);
   }

  login(command: any): Observable<any> {
     return this.http.post(`${this.apiUrl}/colaborador/login`, command);
   }
}
