import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatGeneralComponent } from './treat-general.component';

describe('TreatGeneralComponent', () => {
  let component: TreatGeneralComponent;
  let fixture: ComponentFixture<TreatGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreatGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
