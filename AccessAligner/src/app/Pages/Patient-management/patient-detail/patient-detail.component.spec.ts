import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailComponent } from './patient-detail.component';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';


describe('PatientDetailComponent', () => {





  let component: PatientDetailComponent;
  let fixture: ComponentFixture<PatientDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDetailComponent],
      providers: [

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
    
    fixture = TestBed.createComponent(PatientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


