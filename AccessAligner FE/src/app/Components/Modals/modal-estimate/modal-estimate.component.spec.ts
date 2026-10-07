import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEstimateComponent } from './modal-estimate.component';

describe('ModalEstimateComponent', () => {
  let component: ModalEstimateComponent;
  let fixture: ComponentFixture<ModalEstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEstimateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
