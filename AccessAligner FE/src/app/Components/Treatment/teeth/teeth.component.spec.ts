import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeethComponent } from './teeth.component';

describe('TeethComponent', () => {
  let component: TeethComponent;
  let fixture: ComponentFixture<TeethComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeethComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeethComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
