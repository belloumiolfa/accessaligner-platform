import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoFormComponent } from './photo-form.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PhotoFormComponent', () => {
  let component: PhotoFormComponent;
  let fixture: ComponentFixture<PhotoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFormComponent],
      providers: [      HttpClient , HttpHandler]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
