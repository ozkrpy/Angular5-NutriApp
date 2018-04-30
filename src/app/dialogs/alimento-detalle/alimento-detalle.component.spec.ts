import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentoDetalleComponent } from './alimento-detalle.component';

describe('AlimentoDetalleComponent', () => {
  let component: AlimentoDetalleComponent;
  let fixture: ComponentFixture<AlimentoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
