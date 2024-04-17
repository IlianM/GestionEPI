import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

// Composants de l'application
import { AppComponent } from './app.component';
import { EpiTableComponent } from './components/epi-table/epi-table.component';
import { EditEpiDialogComponent } from './components/edit-epi-dialog/edit-epi-dialog.component';
import { AddEpiDialogComponent } from './components/add-epi-dialog/add-epi-dialog.component';
import { DeleteEpiDialogComponent } from './components/delete-epi-dialog/delete-epi-dialog.component';
import { LoginComponent } from './login/login.component';
import { EpiService } from './services/epi.service';
import { EpiCheckTableComponent } from './components/epi-check-table/epi-check-table.component';
import { EditEpiCheckDialogComponent } from './components/edit-epi-check-dialog/edit-epi-check-dialog.component';  // Assurez-vous d'avoir ce composant

@NgModule({
  declarations: [
    AppComponent,
    EpiTableComponent,
    EditEpiDialogComponent,
    AddEpiDialogComponent,
    DeleteEpiDialogComponent,
    LoginComponent,
    EpiCheckTableComponent,
    EditEpiCheckDialogComponent  // Déclare le nouveau composant ici
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [
    EpiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
