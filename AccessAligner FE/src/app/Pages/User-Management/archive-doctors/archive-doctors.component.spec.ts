import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveDoctorsComponent } from './archive-doctors.component';

describe('ArchiveDoctorsComponent', () => {
  let component: ArchiveDoctorsComponent;
  let fixture: ComponentFixture<ArchiveDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveDoctorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchiveDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
