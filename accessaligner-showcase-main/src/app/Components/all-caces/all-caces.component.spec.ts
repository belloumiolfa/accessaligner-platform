import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCacesComponent } from './all-caces.component';

describe('AllCacesComponent', () => {
  let component: AllCacesComponent;
  let fixture: ComponentFixture<AllCacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllCacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
