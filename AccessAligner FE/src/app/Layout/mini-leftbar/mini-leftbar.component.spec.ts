import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniLeftbarComponent } from './mini-leftbar.component';

describe('MiniLeftbarComponent', () => {
  let component: MiniLeftbarComponent;
  let fixture: ComponentFixture<MiniLeftbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniLeftbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniLeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
