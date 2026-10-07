import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientComponent } from './patient.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PatientComponent', () => {
  let component: PatientComponent;
  let fixture: ComponentFixture<PatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientComponent],
      providers: [      HttpClient , HttpHandler ,


          {
            provide: ActivatedRoute,
            useValue: {
              params: of({ id: '123' }), // Mock any params you need
              snapshot: { paramMap: { get: () => '123' } } // Mock snapshot if needed
            }
          },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
