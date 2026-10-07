import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCountCardComponent } from './total-count-card.component';

describe('TotalCountCardComponent', () => {
  let component: TotalCountCardComponent;
  let fixture: ComponentFixture<TotalCountCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalCountCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalCountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
