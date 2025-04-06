import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <header class="home-header">
      <div class="logo">
        <img src="assets/Logo.png" alt="León de Judá Logo" />
        <span class="team-name">LEÓN DE JUDÁ</span>
      </div>
      <nav class="home-nav">
        <ul>
          <li><a routerLink="/home">Inicio</a></li>
          <li><a routerLink="/plantel">Plantel</a></li>
          <li *ngIf="canViewPrerequisites | async"><a routerLink="/fixture">Fixture</a></li>
          <li *ngIf="canViewPrerequisites | async"><a routerLink="/prerequisites">PreRequisitos</a></li>   
          <li *ngIf="canViewPrerequisites | async"><a routerLink="/metricas">Metricas</a></li>        
        </ul>

        <div *ngIf="isAuthenticated | async; else loginTemplate" class="user-menu">
          <div class="user-info" (click)="toggleMenu()">
            <img [src]="(currentUser | async)?.photoURL" alt="User Avatar" class="user-avatar" />
            <span>{{ (currentUser | async)?.displayName }}</span>
          </div>
          <ul class="menu-dropdown" *ngIf="menuVisible">
            <li (click)="logout()">Cerrar Sesión</li>
          </ul>
        </div>
        <ng-template #loginTemplate>
          <button class="login-button" (click)="login()">Login with Google</button>
        </ng-template>

      </nav>
    </header>
  `,
  styles: [`
    .home-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      background-color: #f0b917;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logo img {
      height: 50px;
    }

    .team-name {
      font-size: 1.5rem;
      font-weight: bold;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .home-nav {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .home-nav ul {
      list-style: none;
      display: flex;
      gap: 15px;
      margin: 0;
      padding: 0;
    }

    .home-nav ul li {
      display: inline;
    }

    .home-nav ul li a {
      text-decoration: none;
      color: #fff;
      font-weight: bold;
      padding: 5px 10px;
      border-radius: 5px;
      transition: background-color 0.3s;
    }

    .home-nav ul li a:hover {
      background-color: #d89b10;
    }

    .login-button {
      background-color: #4285f4;
      color: white;
      font-weight: bold;
      padding: 5px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .login-button:hover {
      background-color: #357ae8;
    }

    .user-menu {
      position: relative;
      display: flex;
      align-items: center;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      background-color: #fff;
      padding: 5px 10px;
      border-radius: 20px;
      transition: background-color 0.3s;
    }

    .user-info:hover {
      background-color: #eee;
    }

    .user-avatar {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      object-fit: cover;
    }

    .menu-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: white;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      list-style: none;
      padding: 10px 0;
      margin: 0;
      z-index: 1000;
    }

    .menu-dropdown li {
      padding: 10px 20px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .menu-dropdown li:hover {
      background-color: #f0b917;
      color: white;
    }
  `],
})
export class HeaderComponent {
  isAuthenticated = this.authService.isAuthenticated$;
  currentUser = this.authService.currentUser$; // Nueva propiedad que calcula si el usuario puede ver "Prerequisitos"
  canViewPrerequisites: Observable<boolean>;
  menuVisible = false;

  constructor(private authService: AuthService) {
    // Calcular el acceso a "Prerequisitos" combinando autenticación y lista de correos
    this.canViewPrerequisites = this.currentUser.pipe(
      map((user) => !!user && this.authService.isEmailAllowed(user.email!))
    );
  }

  login(): void {
    this.authService.loginWithGoogle().catch((error) =>
      alert(`Login failed: ${error.message}`)
    );
  }

  logout(): void {
    this.authService.logout().catch((error) =>
      alert(`Logout failed: ${error.message}`)
    );
    this.menuVisible = false;
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }
}
