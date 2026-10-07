import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicCaseComponent } from './clinic-case.component';

describe('ClinicCaseComponent', () => {
  let component: ClinicCaseComponent;
  let fixture: ComponentFixture<ClinicCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicCaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
