import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProfileMenuComponent } from './info-profile-menu.component';

describe('InfoProfileMenuComponent', () => {
  let component: InfoProfileMenuComponent;
  let fixture: ComponentFixture<InfoProfileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoProfileMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoProfileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
