import { Component } from '@angular/core';
import { AulaFlexServiceService } from 'src/app/shared/aula-flex-service.service';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css'],
})
export class RedefinirSenhaComponent {
  email: string = '';
  mensagem: string = '';
  mensagemErro: boolean = false;

  constructor(private aulaFlexService: AulaFlexServiceService) {}

  enviarEmail() {
    this.mensagem = '';
    this.aulaFlexService.checarEmailDuplicado(this.email).subscribe(
      (response) => {
        if (response === true) {
          this.aulaFlexService
            .enviarEmailRedefinirSenha({ email: this.email })
            .subscribe(
              () => {
                this.mensagem =
                  'E-mail de redefinição de senha enviado com sucesso.';
                this.mensagemErro = false;
              },
              (error) => {
                console.error(
                  'Erro ao enviar o e-mail de redefinição de senha:',
                  error
                );
                this.mensagem =
                  'Erro ao enviar o e-mail. Por favor, tente novamente mais tarde.';
                this.mensagemErro = true;
              }
            );
        } else {
          this.mensagem = 'E-mail não encontrado. Verifique e tente novamente.';
          this.mensagemErro = true;
        }
      },
      (error) => {
        console.error('Erro ao verificar e-mail:', error);
        this.mensagem =
          'Erro ao verificar o e-mail. Por favor, tente novamente mais tarde.';
        this.mensagemErro = true; 
      }
    );
  }
}
