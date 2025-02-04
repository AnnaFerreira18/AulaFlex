import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
username: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Verifique se o usuário e senha estão corretos (isso deve ser feito com um serviço de autenticação)
    if (this.username === 'admin' && this.password === 'senha123') {
      // Redirecionar para a página principal (ou para onde for necessário)
      this.router.navigate(['/home']);
    } else {
      this.error = 'Usuário ou senha inválidos';
    }
  }

}
