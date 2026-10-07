import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComingPageComponent } from './coming-page.component';

describe('ComingPageComponent', () => {
  let component: ComingPageComponent;
  let fixture: ComponentFixture<ComingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
