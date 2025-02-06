import { Component } from '@angular/core';
import { AulaFlexServiceService } from 'src/app/shared/aula-flex-service.service';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css'],
})
export class RedefinirSenhaComponent {
  email: string = '';

  constructor(private aulaFlexService: AulaFlexServiceService) {}

enviarEmail() {
  this.aulaFlexService.checarEmailDuplicado(this.email).subscribe(
    (response) => {
      console.log(response);
      if (response === true) {
        this.aulaFlexService.enviarEmailRedefinirSenha({ email: this.email }).subscribe(
          (response) => {
            console.log('Email de redefinição de senha enviado com sucesso');
          },
          (error) => {
            console.error('Erro ao enviar o email de redefinição de senha:', error);
          }
        );
      } else {
        console.log('Email não encontrado');
      }
    },
    (error) => {
      console.error('Erro ao verificar email', error);
    }
  );
}

}
