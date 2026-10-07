import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacesComponent } from './caces.component';

describe('CacesComponent', () => {
  let component: CacesComponent;
  let fixture: ComponentFixture<CacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
