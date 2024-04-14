import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-epi-dialog',
  templateUrl: './delete-epi-dialog.component.html',
  styleUrls: ['./delete-epi-dialog.component.scss']
})
export class DeleteEpiDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteEpiDialogComponent>) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }
}

