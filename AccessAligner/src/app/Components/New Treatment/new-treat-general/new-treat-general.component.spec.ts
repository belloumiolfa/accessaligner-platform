import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTreatGeneralComponent } from './new-treat-general.component';

describe('NewTreatGeneralComponent', () => {
  let component: NewTreatGeneralComponent;
  let fixture: ComponentFixture<NewTreatGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTreatGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTreatGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
