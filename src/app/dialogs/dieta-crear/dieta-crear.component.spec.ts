import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaCrearComponent } from './dieta-crear.component';

describe('DietaCrearComponent', () => {
  let component: DietaCrearComponent;
  let fixture: ComponentFixture<DietaCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
