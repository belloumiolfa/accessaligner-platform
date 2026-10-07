import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDescriptionEligibleComponent } from './modal-description-eligible.component';

describe('ModalDescriptionEligibleComponent', () => {
  let component: ModalDescriptionEligibleComponent;
  let fixture: ComponentFixture<ModalDescriptionEligibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDescriptionEligibleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDescriptionEligibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
