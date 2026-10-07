import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordComponent } from './update-password.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('UpdatePasswordComponent', () => {
  let component: UpdatePasswordComponent;
  let fixture: ComponentFixture<UpdatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePasswordComponent],
      providers : [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // Mock any params you need
            snapshot: { paramMap: { get: () => '123' } } // Mock snapshot if needed
          }
        },
        HttpClient , HttpHandler
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
