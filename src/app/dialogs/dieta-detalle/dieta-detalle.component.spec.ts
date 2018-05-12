import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaDetalleComponent } from './dieta-detalle.component';

describe('DietaDetalleComponent', () => {
  let component: DietaDetalleComponent;
  let fixture: ComponentFixture<DietaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
