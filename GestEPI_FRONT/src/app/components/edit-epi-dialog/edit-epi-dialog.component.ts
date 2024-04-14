import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EpiService } from '../../services/epi.service';

@Component({
  selector: 'app-edit-epi-dialog',
  templateUrl: './edit-epi-dialog.component.html',
  styleUrls: ['./edit-epi-dialog.component.scss']
})
export class EditEpiDialogComponent implements OnInit {
  epiForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private epiService: EpiService,
    public dialogRef: MatDialogRef<EditEpiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {}

  initializeForm(): void {
    this.epiForm = this.fb.group({
      brand: [this.data.brand],
      model: [this.data.model],
      serialNumber: [this.data.serialNumber],
      epiType: [this.data.epiType]
      // Vous pouvez ajouter d'autres champs nécessaires ici
    });
  }

  onSubmit(): void {
    if (this.epiForm.valid) {
      this.epiService.updateEpi(this.data.id, this.epiForm.value).subscribe({
        next: (response) => {
          // Mise à jour réussie, actualiser les données ou rafraîchir la liste des EPI
          console.log('EPI mis à jour avec succès:', response);
          this.dialogRef.close(response); // Fermer la boîte de dialogue
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de l\'EPI:', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
