import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoryUploadComponent } from './category-upload.component';

describe('CategoryUploadComponent', () => {
  let component: CategoryUploadComponent;
  let fixture: ComponentFixture<CategoryUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
