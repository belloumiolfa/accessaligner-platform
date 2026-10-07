import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTeamInfoComponent } from './modal-team-info.component';

describe('ModalTeamInfoComponent', () => {
  let component: ModalTeamInfoComponent;
  let fixture: ComponentFixture<ModalTeamInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTeamInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalTeamInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
