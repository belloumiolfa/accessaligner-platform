import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedScreenComponent } from './locked-screen.component';

describe('LockedScreenComponent', () => {
  let component: LockedScreenComponent;
  let fixture: ComponentFixture<LockedScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockedScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LockedScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
