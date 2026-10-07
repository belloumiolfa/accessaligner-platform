import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDisplayReportComponent } from './modal-display-report.component';

describe('ModalDisplayReportComponent', () => {
  let component: ModalDisplayReportComponent;
  let fixture: ComponentFixture<ModalDisplayReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDisplayReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDisplayReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
