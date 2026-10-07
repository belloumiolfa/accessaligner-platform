import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyAccessAlignerComponent } from './why-access-aligner.component';

describe('WhyAccessAlignerComponent', () => {
  let component: WhyAccessAlignerComponent;
  let fixture: ComponentFixture<WhyAccessAlignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyAccessAlignerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhyAccessAlignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
