import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateCompanyDialogComponent } from './create-company-dialog.component';

describe('CreateCompanyDialogComponent', () => {
  let component: CreateCompanyDialogComponent;
  let fixture: ComponentFixture<CreateCompanyDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCompanyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompanyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
