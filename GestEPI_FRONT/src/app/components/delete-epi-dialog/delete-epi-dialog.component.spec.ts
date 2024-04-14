import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEpiDialogComponent } from './delete-epi-dialog.component';

describe('DeleteEpiDialogComponent', () => {
  let component: DeleteEpiDialogComponent;
  let fixture: ComponentFixture<DeleteEpiDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteEpiDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteEpiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
