import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EpiService } from '../../services/epi.service';

@Component({
  selector: 'app-add-epi-dialog',
  templateUrl: './add-epi-dialog.component.html',
  styleUrls: ['./add-epi-dialog.component.scss']
})
export class AddEpiDialogComponent implements OnInit {
  epiForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private epiService: EpiService,
    public dialogRef: MatDialogRef<AddEpiDialogComponent>
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {}

  initializeForm(): void {
    this.epiForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      serialNumber: ['', Validators.required],
      innerId: ['', Validators.required],
      epiType: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      manufactureDate: ['', Validators.required],
      inServiceDate: ['', Validators.required],
      checkFrequency: ['', Validators.required],
      checkFrequencyUnit: ['', Validators.required],
      // Ajoutez d'autres champs et validations nécessaires ici
    });
  }

  onSubmit(): void {
    if (this.epiForm.valid) {
      this.epiService.addEpi(this.epiForm.value).subscribe({
        next: (response) => {
          // Ajout réussi, actualiser les données ou rafraîchir la liste des EPI
          console.log('EPI ajouté avec succès:', response);
          this.dialogRef.close(response); // Fermer la boîte de dialogue
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de l\'EPI:', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
