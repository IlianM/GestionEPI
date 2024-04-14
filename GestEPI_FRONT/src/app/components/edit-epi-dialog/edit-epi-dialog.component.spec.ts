import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEpiDialogComponent } from './edit-epi-dialog.component';

describe('EditEpiDialogComponent', () => {
  let component: EditEpiDialogComponent;
  let fixture: ComponentFixture<EditEpiDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEpiDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEpiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
