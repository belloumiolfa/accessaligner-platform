import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveTreatmentsComponent } from './archive-treatments.component';

describe('ArchiveTreatmentsComponent', () => {
  let component: ArchiveTreatmentsComponent;
  let fixture: ComponentFixture<ArchiveTreatmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveTreatmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchiveTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
