import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoAsComponent } from './who-as.component';

describe('WhoAsComponent', () => {
  let component: WhoAsComponent;
  let fixture: ComponentFixture<WhoAsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhoAsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhoAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
