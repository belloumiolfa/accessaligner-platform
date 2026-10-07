import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFormComponent } from './account-form.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AccountFormComponent', () => {
  let component: AccountFormComponent;
  let fixture: ComponentFixture<AccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountFormComponent],
      providers: [      HttpClient , HttpHandler]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
