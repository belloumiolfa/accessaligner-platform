import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTreatTeethComponent } from './new-treat-teeth.component';

describe('NewTreatTeethComponent', () => {
  let component: NewTreatTeethComponent;
  let fixture: ComponentFixture<NewTreatTeethComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTreatTeethComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTreatTeethComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
