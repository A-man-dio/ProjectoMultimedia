import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMidiaComponent } from './editar-midia.component';

describe('EditarMidiaComponent', () => {
  let component: EditarMidiaComponent;
  let fixture: ComponentFixture<EditarMidiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMidiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarMidiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
