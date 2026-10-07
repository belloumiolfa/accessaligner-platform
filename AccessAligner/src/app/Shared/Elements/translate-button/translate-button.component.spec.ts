import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateButtonComponent } from './translate-button.component';

describe('TranslateButtonComponent', () => {
  let component: TranslateButtonComponent;
  let fixture: ComponentFixture<TranslateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranslateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
