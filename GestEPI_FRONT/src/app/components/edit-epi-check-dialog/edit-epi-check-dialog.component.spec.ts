import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEpiCheckDialogComponent } from './edit-epi-check-dialog.component';

describe('EditEpiCheckDialogComponent', () => {
  let component: EditEpiCheckDialogComponent;
  let fixture: ComponentFixture<EditEpiCheckDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEpiCheckDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEpiCheckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
