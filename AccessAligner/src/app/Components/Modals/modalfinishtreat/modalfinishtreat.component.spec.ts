import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalfinishtreatComponent } from './modalfinishtreat.component';

describe('ModalfinishtreatComponent', () => {
  let component: ModalfinishtreatComponent;
  let fixture: ComponentFixture<ModalfinishtreatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalfinishtreatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalfinishtreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
