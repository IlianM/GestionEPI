import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EpiCheckService } from '../../services/epi-check.service';

@Component({
  selector: 'app-edit-epi-check-dialog',
  templateUrl: './edit-epi-check-dialog.component.html',
  styleUrls: ['./edit-epi-check-dialog.component.scss']
})
export class EditEpiCheckDialogComponent implements OnInit {
  epiCheckForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private epiCheckService: EpiCheckService,
    public dialogRef: MatDialogRef<EditEpiCheckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {}

  private formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0]; // Formats date to YYYY-MM-DD
  }

  initializeForm(): void {
    this.epiCheckForm = this.fb.group({
      epiId: [this.data.epiId],
      checkDate: [this.formatDate(this.data.checkDate)],
      checkStatus: [this.data.checkStatus],
      userId: [this.data.userId],
      checkComment: [this.data.checkComment]
    });
  }

  onSubmit(): void {
    if (this.epiCheckForm.valid) {
      this.epiCheckService.updateEpiCheck(this.data.id, this.epiCheckForm.value).subscribe({
        next: (response) => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du EpiCheck:', error);
        }
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
