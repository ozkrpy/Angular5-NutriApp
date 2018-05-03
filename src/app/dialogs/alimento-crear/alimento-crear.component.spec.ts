import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentoCrearComponent } from './alimento-crear.component';

describe('AlimentoCrearComponent', () => {
  let component: AlimentoCrearComponent;
  let fixture: ComponentFixture<AlimentoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
