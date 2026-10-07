import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtakComponent } from './otak.component';

describe('OtakComponent', () => {
  let component: OtakComponent;
  let fixture: ComponentFixture<OtakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtakComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
