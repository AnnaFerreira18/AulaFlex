import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

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
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
   {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('644409398312-dc8lc7ohd37uks7dov7kkr3pfdgueuqn.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1042478310977057')
          }
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
