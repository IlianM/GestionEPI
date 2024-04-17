import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Ajustez le chemin selon vos besoins

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string;  // Pour stocker et afficher les messages d'erreur

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      firstName: ['', Validators.required], // Ajout d'un validateur requis
      lastName: ['', Validators.required]   // Ajout d'un validateur requis
    });
    this.errorMessage = '';  // Initialisation du message d'erreur
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          // Gérez la réponse en fonction de la structure de votre API
          if (response.success) {
            // Assurez-vous que la réponse contient les bons champs selon votre API
            this.router.navigate(['/epi-list']); // Redirection vers la page de liste des EPI
          } else {
            this.errorMessage = 'Invalid credentials'; // Affichage du message d'erreur
          }
        },
        error: (error) => {
          // Affichez un message d'erreur en fonction de l'erreur retournée
          this.errorMessage = error?.error?.message || 'Error during login';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields'; // Validation des champs du formulaire
    }
  }
}
