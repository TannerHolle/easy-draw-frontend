import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DrawNameDialogComponent } from './draw-name-dialog.component';

describe('DrawNameDialogComponent', () => {
  let component: DrawNameDialogComponent;
  let fixture: ComponentFixture<DrawNameDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawNameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
