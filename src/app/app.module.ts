import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RedefinirSenhaComponent } from './components/redefinir-senha/redefinir-senha.component'; 
import { NovaSenhaComponent } from './components/redefinir-senha/nova-senha/nova-senha.component';
import { LoginComponent } from './components/login/login.component';
import { ListarInscricoesComponent } from './components/listar-inscricoes/listar-inscricoes.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CriarContaComponent } from './components/criar-conta/criar-conta.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    RedefinirSenhaComponent,
    NovaSenhaComponent,
    LoginComponent,
    ListarInscricoesComponent,
    InicioComponent,
    CriarContaComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
