import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawNameDialogComponent } from './draw-name-dialog.component';

describe('DrawNameDialogComponent', () => {
  let component: DrawNameDialogComponent;
  let fixture: ComponentFixture<DrawNameDialogComponent>;

  beforeEach(async(() => {
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
