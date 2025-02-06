import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CriarContaComponent } from './components/criar-conta/criar-conta.component';
import { LoginComponent } from './components/login/login.component';
import { ListarInscricoesComponent } from './components/listar-inscricoes/listar-inscricoes.component';
import { RedefinirSenhaComponent } from './components/redefinir-senha/redefinir-senha.component';
import { NovaSenhaComponent } from './components/redefinir-senha/nova-senha/nova-senha.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'criarConta', component: CriarContaComponent },
  { path: 'listarInscricoes', component: ListarInscricoesComponent },
  { path: 'redefinirSenha', component: RedefinirSenhaComponent },
  { path: 'novaSenha/:email/:chave', component: NovaSenhaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
