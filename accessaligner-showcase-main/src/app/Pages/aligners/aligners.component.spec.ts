import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignersComponent } from './aligners.component';

describe('AlignersComponent', () => {
  let component: AlignersComponent;
  let fixture: ComponentFixture<AlignersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlignersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlignersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
