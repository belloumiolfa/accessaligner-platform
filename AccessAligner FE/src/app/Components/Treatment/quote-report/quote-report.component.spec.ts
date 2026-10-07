import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteReportComponent } from './quote-report.component';

describe('QuoteReportComponent', () => {
  let component: QuoteReportComponent;
  let fixture: ComponentFixture<QuoteReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuoteReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
