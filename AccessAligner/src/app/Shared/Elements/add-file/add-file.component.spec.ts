import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFileComponent } from './add-file.component';

describe('AddFileComponent', () => {
  let component: AddFileComponent;
  let fixture: ComponentFixture<AddFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFileComponent);
    component = fixture.componentInstance;

    // Mock item object with an id
    const mockItem = { id: 123 }; // Replace with your expected id value

    component.item = mockItem; // Set the mock item
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // You can add further assertions that depend on item.id here
  });
});