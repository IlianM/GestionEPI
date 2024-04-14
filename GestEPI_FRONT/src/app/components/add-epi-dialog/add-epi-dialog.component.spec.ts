import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEpiDialogComponent } from './add-epi-dialog.component';

describe('AddEpiDialogComponent', () => {
  let component: AddEpiDialogComponent;
  let fixture: ComponentFixture<AddEpiDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEpiDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEpiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
