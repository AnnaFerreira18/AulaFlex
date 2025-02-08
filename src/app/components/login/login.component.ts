import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  onSubmit(): void {
    if (this.email && this.senha) {
    
      if (!this.isEmailValid(this.email)) {
        this.error = 'Por favor, insira um e-mail válido.';
        return;
      }

      // Tentando fazer o login
      this.authService.login(this.email, this.senha).subscribe(
        (response) => {
          if (response && response.token) {
            console.log(response)
            const colaborador = response.idColaborador;
            const token = response.token;
            localStorage.setItem('colaborador', JSON.stringify(colaborador));

            this.authService.saveToken(token);
            localStorage.setItem('jwt_token', token);

            // Redirecionando para a página "inicio"
            this.router.navigate(['/inicio']);
          } else {
            this.error = 'Ocorreu um erro. Tente novamente.';
          }
        },
        (error) => {
          this.error = 'Credenciais inválidas. Tente novamente.';
        }
      );
    } else {
      this.error = 'Preencha todos os campos corretamente!';
    }
  }


  isEmailValid(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
}
