import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InvoiceCreateComponent } from './invoice-create.component';

describe('InvoiceCreateComponent', () => {
  let component: InvoiceCreateComponent;
  let fixture: ComponentFixture<InvoiceCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
