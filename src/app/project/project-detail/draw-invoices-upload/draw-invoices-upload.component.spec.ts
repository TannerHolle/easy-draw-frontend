import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DrawInvoicesUploadComponent } from './draw-invoices-upload.component';

describe('DrawInvoicesUploadComponent', () => {
  let component: DrawInvoicesUploadComponent;
  let fixture: ComponentFixture<DrawInvoicesUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawInvoicesUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawInvoicesUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
