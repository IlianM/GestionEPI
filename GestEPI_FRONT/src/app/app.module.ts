import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core'; // Ajout de MAT_DATE_LOCALE

// Importations de Material
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// Composants de l'application
import { AppComponent } from './app.component';
import { EpiTableComponent } from './components/epi-table/epi-table.component';
import { EditEpiDialogComponent } from './components/edit-epi-dialog/edit-epi-dialog.component';
import { AddEpiDialogComponent } from './components/add-epi-dialog/add-epi-dialog.component';
import { DeleteEpiDialogComponent } from './components/delete-epi-dialog/delete-epi-dialog.component';
import { EpiService } from './services/epi.service';

@NgModule({
  declarations: [
    AppComponent,
    EpiTableComponent,
    EditEpiDialogComponent,
    AddEpiDialogComponent,
    DeleteEpiDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatDatepickerModule
  ],
  providers: [
    EpiService,
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' } // Définition de la locale des dates
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
