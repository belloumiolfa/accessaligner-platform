import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTreatPhotosComponent } from './new-treat-photos.component';

describe('NewTreatPhotosComponent', () => {
  let component: NewTreatPhotosComponent;
  let fixture: ComponentFixture<NewTreatPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTreatPhotosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTreatPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
