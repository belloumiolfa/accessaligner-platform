import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistStatisticsComponent } from './dentist-statistics.component';

describe('DentistStatisticsComponent', () => {
  let component: DentistStatisticsComponent;
  let fixture: ComponentFixture<DentistStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DentistStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DentistStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
