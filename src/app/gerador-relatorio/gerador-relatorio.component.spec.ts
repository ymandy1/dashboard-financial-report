import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeradorRelatorioComponent } from './gerador-relatorio.component';

describe('GeradorRelatorioComponent', () => {
  let component: GeradorRelatorioComponent;
  let fixture: ComponentFixture<GeradorRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeradorRelatorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeradorRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
