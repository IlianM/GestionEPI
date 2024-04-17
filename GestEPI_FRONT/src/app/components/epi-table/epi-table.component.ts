import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EpiService } from '../../services/epi.service';
import { EditEpiDialogComponent } from '../edit-epi-dialog/edit-epi-dialog.component';
import { AddEpiDialogComponent } from '../add-epi-dialog/add-epi-dialog.component';
import { DeleteEpiDialogComponent } from '../delete-epi-dialog/delete-epi-dialog.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-epi-table',
  templateUrl: './epi-table.component.html',
  styleUrls: ['./epi-table.component.scss']
})
export class EpiTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'brand', 'model', 'serialNumber', 'innerId', 'epiType', 'size', 'color', 'purchaseDate', 'manufactureDate', 'inServiceDate', 'checkFrequency', 'checkFrequencyUnit', 'actions'];
  epi: any[] = []; // Ce tableau sera utilisé comme source de données pour le tableau

  constructor(private epiService: EpiService, public dialog: MatDialog,private router: Router,) { }

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
        this.epiService.addEpi(result).subscribe(
          (newEpi) => {
            this.epi.push(newEpi);
            this.epi = [...this.epi]; // Rafraîchir les données après l'ajout d'un nouvel EPI
          },
          error => {
            console.error('Error when adding EPI:', error);
          }
        );
      }
    });
  }

  openEditDialog(epiData: any): void {
    const dialogRef = this.dialog.open(EditEpiDialogComponent, {
      width: '250px',
      data: epiData // Passez les données de l'EPI à modifier au dialogue
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
  navigateToEpiCheckList(): void {
    this.router.navigate(['/epi-check']);
  }
}
