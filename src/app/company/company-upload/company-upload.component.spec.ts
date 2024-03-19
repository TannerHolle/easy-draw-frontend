import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompanyUploadComponent } from './company-upload.component';

describe('CompanyUploadComponent', () => {
  let component: CompanyUploadComponent;
  let fixture: ComponentFixture<CompanyUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
