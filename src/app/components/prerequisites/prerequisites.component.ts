import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card'; 
import { CommonModule } from '@angular/common'; // ¡Añadir esta importación!
import { Player, PlayerWithAverage } from '../../models/player';

@Component({
  selector: 'app-prerequisites',
  standalone: true,
  imports: [MatTabsModule, MatTableModule, CommonModule, MatTooltipModule, MatListModule, MatIconModule, MatExpansionModule, MatCardModule],
  templateUrl: './prerequisites.component.html', 
  styleUrls: ['./prerequisites.component.scss']
})
export class PrerequisitesComponent {
  displayedColumns: string[] = ['nro','nombre', 'AP', 'CC', 'RF', 'CI', 'RT', 'promedio'];
  players: Player[] = [
    { nombre: "Juan Chilcon", AP: 100, CC: 10, RF: 16, CI: 100, RT: 100 },
    { nombre: "Irwin Vasquez", AP: 100, CC: 30, RF: 16, CI: 100, RT: 100 },
    { nombre: "Victor Mendoza", AP: 100, CC: 0, RF: 0, CI: 100, RT: 100 },
    { nombre: "Marco Paz", AP: 0, CC: 0, RF: 0, CI: 0, RT: 100 },
    { nombre: "Junior Cabanillas", AP: 100, CC: 30, RF: 16, CI: 100, RT: 100 },
    { nombre: "Angello Salazar", AP: 100, CC: 0, RF: 0, CI: 100, RT: 100 },
    { nombre: "Cristian Villalobos", AP: 100, CC: 20, RF: 5, CI: 100, RT: 100 },
    { nombre: "Luis Hernandez", AP: 100, CC: 30, RF: 2, CI: 100, RT: 100 },
    { nombre: "Willy Morales", AP: 100, CC: 30, RF: 16, CI: 100, RT: 100 },
    { nombre: "Segundo Laynes", AP: 100, CC: 30, RF: 14, CI: 100, RT: 100 },
    { nombre: "Ivan Morales", AP: 100, CC: 30, RF: 16, CI: 0, RT: 100 },
    { nombre: "Tommy Huaman", AP: 0, CC: 0, RF: 4, CI: 0, RT: 100 },
    { nombre: "Jerson Galvez", AP: 100, CC: 4, RF: 16, CI: 100, RT: 100 },
    { nombre: "Alexander Olano", AP: 100, CC: 15, RF: 16, CI: 100, RT: 100 },
    { nombre: "Yuhsef Julian", AP: 100, CC: 30, RF: 16, CI: 100, RT: 100 },
    { nombre: "Maicol Chavez", AP: 100, CC: 0, RF: 16, CI: 100, RT: 100 },
    { nombre: "Maximiliano Farroñan", AP: 0, CC: 30, RF: 11, CI: 0, RT: 100 },
    { nombre: "Julio Cotrina", AP: 0, CC: 0, RF: 0, CI: 0, RT: 100 },
    { nombre: "Cristofer Rimarachin", AP: 100, CC: 0, RF: 16, CI: 100, RT: 100 },
    { nombre: "Danny Miranda", AP: 100, CC: 30, RF: 4, CI: 100, RT: 100 },
    { nombre: "Gerson Barturen", AP: 100, CC: 30, RF: 1, CI: 100, RT: 100 },
    { nombre: "Anderson Ruiz", AP: 100, CC: 15, RF: 10, CI: 100, RT: 100 },
    { nombre: "Klismar Chinchay", AP: 100, CC: 30, RF: 10, CI: 100, RT: 100 },
  ].sort((a, b) => {
    const sumA = a.AP + a.CC/0.3 + a.RF/0.16 + a.CI + a.RT;
    const sumB = b.AP + b.CC/0.3 + b.RF/0.16 + b.CI+ b.RT;
    return sumB - sumA; // Orden descendente
  });;
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
      }
    });
  }

  get playersWithAverages(): PlayerWithAverage[] {
    return this.players.map(player => ({
      ...player,
      promedio: this.calculateAverage(player)
    }));
  }

  private calculateAverage(player: Player): number {
    return Math.round((player.AP + player.CC/0.30 + player.RF/0.16 + player.CI + player.RT) / 5);
  }

  getRowClass(player: PlayerWithAverage): string {
    if (player.promedio < 60) return 'low';
    if (player.promedio <= 78) return 'medium';
    if (player.promedio <= 90) return 'high';
    return 'excellent';
  }
}