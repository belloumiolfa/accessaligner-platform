import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpLinkComponent } from './help-link.component';

describe('HelpLinkComponent', () => {
  let component: HelpLinkComponent;
  let fixture: ComponentFixture<HelpLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
