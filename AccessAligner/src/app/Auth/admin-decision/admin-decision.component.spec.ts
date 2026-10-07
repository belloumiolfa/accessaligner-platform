import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDecisionComponent } from './admin-decision.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AdminDecisionComponent', () => {
  let component: AdminDecisionComponent;
  let fixture: ComponentFixture<AdminDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDecisionComponent],
      providers: [  HttpClient , HttpHandler ,

        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // Mock any params you need
            snapshot: { paramMap: { get: () => '123' } } // Mock snapshot if needed
          }
        },


      ], 
      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
