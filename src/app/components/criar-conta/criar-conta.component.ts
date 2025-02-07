import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AulaFlexServiceService } from 'src/app/shared/aula-flex-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css'],
})
export class CriarContaComponent {
  form: FormGroup;
  public emailDuplicado = false;
  public senhaNaoCoincide = false;
  public formData = {
    nome: '',
    email: '',
    senha: '',
  };
  public confirmarSenha: string = '';
  mensagem: string = '';
  mostrarMensagem: boolean = false;

  constructor(
    private fb: FormBuilder,
    private aulaFlexService: AulaFlexServiceService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
    });
  }

  checarEmail() {
    if (!this.formData.email) {
      this.emailDuplicado = false;
      return;
    }

    this.aulaFlexService.checarEmailDuplicado(this.formData.email).subscribe(
      (response) => {
        this.emailDuplicado = response;
      },
      (error) => {
        console.error('Erro ao verificar e-mail:', error);
        this.emailDuplicado = false;
      }
    );
  }

  verificarSenhas() {
    this.senhaNaoCoincide = this.formData.senha !== this.confirmarSenha;
  }

  criarConta() {
    this.senhaNaoCoincide = this.formData.senha !== this.confirmarSenha;

    if (this.senhaNaoCoincide || this.emailDuplicado) {
      return;
    }

    const command = {
      nome: this.formData.nome,
      email: this.formData.email,
      senha: this.formData.senha,
    };

    this.aulaFlexService.criarConta(command).subscribe(
      (response) => {
        this.mensagem = 'conta criada com sucesso!';
        this.mostrarMensagem = true;
        setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
      },
      (error) => {
        this.mensagem = 'Erro ao criar conta.';
        this.mostrarMensagem = true;

        setTimeout(() => {
          this.mostrarMensagem = false;
          this.mensagem = '';
        }, 3000);
      }
    );
  }
}
