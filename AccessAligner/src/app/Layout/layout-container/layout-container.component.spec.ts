import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutContainerComponent } from './layout-container.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('LayoutContainerComponent', () => {
  let component: LayoutContainerComponent;
  let fixture: ComponentFixture<LayoutContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutContainerComponent],
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
    
    fixture = TestBed.createComponent(LayoutContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
