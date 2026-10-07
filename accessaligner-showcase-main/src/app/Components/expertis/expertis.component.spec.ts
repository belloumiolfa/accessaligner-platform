import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertisComponent } from './expertis.component';

describe('ExpertisComponent', () => {
  let component: ExpertisComponent;
  let fixture: ComponentFixture<ExpertisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
