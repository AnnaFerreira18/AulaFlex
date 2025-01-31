import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInscricoesComponent } from './listar-inscricoes.component';

describe('ListarInscricoesComponent', () => {
  let component: ListarInscricoesComponent;
  let fixture: ComponentFixture<ListarInscricoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarInscricoesComponent]
    });
    fixture = TestBed.createComponent(ListarInscricoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
