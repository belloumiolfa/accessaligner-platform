import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptFormComponent } from './accept-form.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AcceptFormComponent', () => {
  let component: AcceptFormComponent;
  let fixture: ComponentFixture<AcceptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptFormComponent],
      providers: [  HttpClient , HttpHandler]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcceptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
