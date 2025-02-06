import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  loginGoogle(): Observable<any> {
    return this.http.get(`${this.apiUrl}/colaborador/login-google`);
  }

  loginFacebook(): Observable<any> {
    return this.http.get(`${this.apiUrl}/colaborador/login-facebook`);
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/colaborador/login`, {
      email,
      senha,
    });
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('colaborador');
  }

  getItemLocalStorage(nomeChave: string): any {
    return localStorage.getItem(nomeChave);
  }

  getJsonLocalStorage(nomeChave: string): any {
    return JSON.parse(this.getItemLocalStorage(nomeChave));
  }
}
