import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirUtilizadoresComponent } from './gerir-utilizadores.component';

describe('GerirUtilizadoresComponent', () => {
  let component: GerirUtilizadoresComponent;
  let fixture: ComponentFixture<GerirUtilizadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerirUtilizadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerirUtilizadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
