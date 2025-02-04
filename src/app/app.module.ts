import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RedefinirSenhaComponent } from './components/redefinir-senha/redefinir-senha.component';
import { NovaSenhaComponent } from './components/redefinir-senha/nova-senha/nova-senha.component';
import { LoginComponent } from './components/login/login.component';
import { ListarInscricoesComponent } from './components/listar-inscricoes/listar-inscricoes.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CriarContaComponent } from './components/criar-conta/criar-conta.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header-footer/header/header.component';
import { FooterComponent } from './components/header-footer/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    RedefinirSenhaComponent,
    NovaSenhaComponent,
    LoginComponent,
    ListarInscricoesComponent,
    InicioComponent,
    CriarContaComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
