import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDisplayPhotoComponent } from './modal-display-photo.component';

describe('ModalDisplayPhotoComponent', () => {
  let component: ModalDisplayPhotoComponent;
  let fixture: ComponentFixture<ModalDisplayPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDisplayPhotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDisplayPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
