import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTreatmentComponent } from './add-new-treatment.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AddNewTreatmentComponent', () => {
  let component: AddNewTreatmentComponent;
  let fixture: ComponentFixture<AddNewTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewTreatmentComponent],
      providers: [ HttpClient , HttpHandler ,


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
    
    fixture = TestBed.createComponent(AddNewTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
