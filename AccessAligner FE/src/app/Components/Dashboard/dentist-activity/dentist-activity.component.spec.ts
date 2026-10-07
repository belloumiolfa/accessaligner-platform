import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistActivityComponent } from './dentist-activity.component';

describe('DentistActivityComponent', () => {
  let component: DentistActivityComponent;
  let fixture: ComponentFixture<DentistActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DentistActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DentistActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
