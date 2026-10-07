import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDentistComponent } from './top-dentist.component';

describe('TopDentistComponent', () => {
  let component: TopDentistComponent;
  let fixture: ComponentFixture<TopDentistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopDentistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopDentistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
