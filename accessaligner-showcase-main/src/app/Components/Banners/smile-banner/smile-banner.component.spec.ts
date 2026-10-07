import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmileBannerComponent } from './smile-banner.component';

describe('SmileBannerComponent', () => {
  let component: SmileBannerComponent;
  let fixture: ComponentFixture<SmileBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmileBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmileBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
