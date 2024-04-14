import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EpiService } from '../../services/epi.service';
import { EditEpiDialogComponent } from '../edit-epi-dialog/edit-epi-dialog.component';
import { AddEpiDialogComponent } from '../add-epi-dialog/add-epi-dialog.component';
import { DeleteEpiDialogComponent } from '../delete-epi-dialog/delete-epi-dialog.component';

@Component({
  selector: 'app-epi-table',
  templateUrl: './epi-table.component.html',
  styleUrls: ['./epi-table.component.scss']
})
export class EpiTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'brand', 'model', 'serialNumber', 'innerId', 'epiType', 'size', 'color', 'purchaseDate', 'manufactureDate', 'inServiceDate', 'checkFrequency', 'checkFrequencyUnit', 'actions'];
  epi: any[] = []; // Ce tableau sera utilisé comme source de données pour le tableau

  constructor(private epiService: EpiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchEpiData();
  }

  fetchEpiData(): void {
    this.epiService.getEpi().subscribe({
      next: (data) => {
        this.epi = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des EPIs:', error);
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEpiDialogComponent, {
      width: '280px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.epi.push(result);
        this.epi = [...this.epi]; // Rafraîchir les données après l'ajout d'un nouvel EPI
      }
    });
  }

  openEditDialog(epiData: any): void {
    const dialogRef = this.dialog.open(EditEpiDialogComponent, {
      width: '250px',
      data: epiData // Passez les données de l'EPI à modifier au dialogue
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.epiService.updateEpi(epiData.id, result).subscribe({
          next: (updatedEpi) => {
            const index = this.epi.findIndex(epi => epi.id === epiData.id);
            if (index !== -1) {
              this.epi[index] = { ...this.epi[index], ...updatedEpi };
              this.epi = [...this.epi]; // Rafraîchir les données du tableau
            }
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour de l\'EPI:', error);
          }
        });
      }
    });
  }

  openDeleteDialog(epi: any): void {
    const dialogRef = this.dialog.open(DeleteEpiDialogComponent, {
      width: '250px',
      data: { epi }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Supprimer l'EPI supprimé du tableau
        this.epiService.deleteEpi(epi.id).subscribe({
          next: () => {
            this.epi = this.epi.filter(e => e.id !== epi.id);
          },
          error: (error) => {
            console.error('Erreur lors de la suppression de l\'EPI:', error);
          }
        });
      }
    });
  }
}
