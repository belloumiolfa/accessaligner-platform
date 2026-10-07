import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDevisTreatComponent } from './content-devis-treat.component';

describe('ContentDevisTreatComponent', () => {
  let component: ContentDevisTreatComponent;
  let fixture: ComponentFixture<ContentDevisTreatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentDevisTreatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentDevisTreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
