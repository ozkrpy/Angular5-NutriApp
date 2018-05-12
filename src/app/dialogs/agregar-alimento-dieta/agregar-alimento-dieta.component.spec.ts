import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAlimentoDietaComponent } from './agregar-alimento-dieta.component';

describe('AgregarAlimentoDietaComponent', () => {
  let component: AgregarAlimentoDietaComponent;
  let fixture: ComponentFixture<AgregarAlimentoDietaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarAlimentoDietaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAlimentoDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
