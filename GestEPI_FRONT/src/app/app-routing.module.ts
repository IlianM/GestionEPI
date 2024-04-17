import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EpiTableComponent } from './components/epi-table/epi-table.component';
import { LoginComponent } from './login/login.component';
import { EpiCheckTableComponent } from './components/epi-check-table/epi-check-table.component'; // Assurez-vous que le chemin d'importation est correct

const routes: Routes = [
  // Redirection par défaut vers la page de connexion
  { path: '', redirectTo: '/epi-check', pathMatch: 'full' },

  // Route pour la page de connexion
  { path: 'login', component: LoginComponent },

  // Route pour la liste des EPI
  { path: 'epi-list', component: EpiTableComponent },

  // Ajoutez votre nouvelle route ici
  { path: 'epi-check', component: EpiCheckTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
