import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HeaderComponent } from './app/components/header/header.component';
import { FooterComponent } from './app/components/footer/footer.component';
import { routes } from './app/app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth, Auth } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { CommonModule } from '@angular/common'; // Importar CommonModule

const firebaseConfig = {
  apiKey: "AIzaSyDJOtuS8bJprrf5oHV0qexTm3wiAWPdwwU",
  authDomain: "leondejudarav.firebaseapp.com",
  projectId: "leondejudarav",
  storageBucket: "leondejudarav.firebasestorage.app",
  messagingSenderId: "707893676616",
  appId: "1:707893676616:web:1e801b65873ca0bbc0267d"
};

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule], // Agregado CommonModule
    template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
    styles: [`
    main {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .login-container {
      text-align: center;
      margin-top: 20px;
    }
    button {
      background-color: #4285f4;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 1rem;
      border-radius: 5px;
      cursor: pointer;
      margin: 5px;
    }
    button:hover {
      background-color: #357ae8;
    }
  `]
})
export class App {
  user: any;
  isLoggingIn = false; // Bandera para evitar múltiples solicitudes

  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }  
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
});
