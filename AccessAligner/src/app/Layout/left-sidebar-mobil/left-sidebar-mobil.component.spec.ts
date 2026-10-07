import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidebarMobilComponent } from './left-sidebar-mobil.component';

describe('LeftSidebarMobilComponent', () => {
  let component: LeftSidebarMobilComponent;
  let fixture: ComponentFixture<LeftSidebarMobilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftSidebarMobilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeftSidebarMobilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
