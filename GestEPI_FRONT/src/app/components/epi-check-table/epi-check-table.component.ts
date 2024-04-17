import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EpiCheckService } from '../../services/epi-check.service';
import { Router } from "@angular/router";
import { EditEpiCheckDialogComponent } from '../edit-epi-check-dialog/edit-epi-check-dialog.component';
import {EditEpiDialogComponent} from "../edit-epi-dialog/edit-epi-dialog.component";

@Component({
  selector: 'app-epi-check-table',
  templateUrl: './epi-check-table.component.html',
  styleUrls: ['./epi-check-table.component.scss']
})
export class EpiCheckTableComponent implements OnInit {
  displayedColumns: string[] = ['epiBrandModel', 'checkDate', 'checkStatusLabel', 'userName', 'checkComment', 'actions'];
  dataSource: any[] = [];

  constructor(
    private epiCheckService: EpiCheckService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchEpiChecks();
  }

  fetchEpiChecks(): void {
    this.epiCheckService.getEpiChecks().subscribe(
      data => this.dataSource = data,
      error => console.error('Error fetching EpiChecks', error)
    );
  }


  openEditDialog(epiCheckData: any): void {
    const dialogRef = this.dialog.open(EditEpiCheckDialogComponent, {
      width: '250px',
      data: epiCheckData // Assurez-vous que epiCheckData contient un champ `id`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.fetchEpiChecks(); // pour rafraîchir les données si nécessaire
      }
    });



  dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateEpiCheck(result);
      }
    });
  }

  addEpiCheck(epiCheck: any): void {
    this.epiCheckService.addEpiCheck(epiCheck).subscribe(
      () => this.fetchEpiChecks(),
      error => console.error('Error adding EpiCheck', error)
    );
  }

  updateEpiCheck(epiCheck: any): void {
    this.epiCheckService.updateEpiCheck(epiCheck.id, epiCheck).subscribe(
      () => this.fetchEpiChecks(),
      error => console.error('Error updating EpiCheck', error)
    );
  }

  deleteEpiCheck(id: number): void {
    this.epiCheckService.deleteEpiCheck(id).subscribe(
      () => this.fetchEpiChecks(),
      error => console.error('Error deleting EpiCheck', error)
    );
  }

  navigateToEpiList(): void {
    this.router.navigate(['/epi-list']);
  }
}
