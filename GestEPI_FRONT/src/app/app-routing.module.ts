  import { NgModule } from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';
  import { EpiTableComponent } from './components/epi-table/epi-table.component';

  // Définition des routes de l'application
  const routes: Routes = [
    // Définir une route pour le chemin racine de l'application
    // qui charge le EpiTableComponent
    { path: '', component: EpiTableComponent }
  ];

  @NgModule({
    // Importer RouterModule et le configurer avec les routes définies
    imports: [RouterModule.forRoot(routes)],
    // Exporter RouterModule pour le rendre disponible dans d'autres parties de l'application
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
