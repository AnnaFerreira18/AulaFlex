import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AulaFlexServiceService } from 'src/app/shared/aula-flex-service.service';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.css'],
})
export class NovaSenhaComponent implements OnInit {
  email: string = '';
  chave: string = '';
  novaSenha: string = '';
  confirmarSenha: string = '';
  mensagem: string = '';
  mensagemErro: boolean = false;

  constructor(private route: ActivatedRoute, private aulaFlexService: AulaFlexServiceService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.email = params.get('email') ?? '';
      this.chave = params.get('chave') ?? '';
    });
  }

  onSubmit(): void {
    if (this.novaSenha !== this.confirmarSenha) {
      this.mensagem = 'As senhas não coincidem!';
      this.mensagemErro = true;
      return;
    }

    const command = {
      email: this.email,
      chave: this.chave,
      senha: this.novaSenha,
    };

    this.aulaFlexService.redefinirSenha(this.email, this.chave, command).subscribe(
      (response) => {
        this.mensagem = 'Senha redefinida com sucesso!';
        this.mensagemErro = false;
      },
      (error) => {
        console.error('Erro ao redefinir senha:', error);
        this.mensagem = 'Erro ao redefinir a senha. Tente novamente.';
        this.mensagemErro = true;
      }
    );
  }
}
