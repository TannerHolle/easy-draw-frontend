import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectInvoicesComponent } from './project-invoices.component';

describe('ProjectInvoicesComponent', () => {
  let component: ProjectInvoicesComponent;
  let fixture: ComponentFixture<ProjectInvoicesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
