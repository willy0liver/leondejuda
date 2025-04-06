import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // ¡Añadir esta importación!
import * as data from '../../../assets/data.json'; // Importa el archivo JSON
import { MatTableModule } from '@angular/material/table';


@Component({
    selector: 'app-fixture',
    imports: [MatTabsModule, MatListModule, MatIconModule, MatExpansionModule, CommonModule, MatTableModule],
    templateUrl: './fixture.component.html',
    styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {
  weeks: any[] = [];

  constructor() {
    console.log('fixture component 1');
    this.weeks = (data as any).semanas;
  }

  ngOnInit(): void {
    console.log('fixture component 2');    
    console.log(this.weeks);
  }

  // Método para verificar si un valor es un array
  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  // Método para obtener claves de un objeto
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  
  getFirstPlayerName(week: any): string {
    const keys = this.getKeys(week); // Obtiene las claves (como "1" o "2")
    const firstKey = keys[0]; // Toma la primera clave
    const players = week[firstKey]; // Obtiene los jugadores bajo esa clave
    if (this.isArray(players) && players.length > 0) {
      return players[0].nombre; // Devuelve el nombre del primer jugador
    }
    return 'Sin Nombre'; // En caso de que no haya datos
  }

  getWeekNumber(week: any): string {
    const keys = this.getKeys(week); // Obtiene las claves (por ejemplo, "1", "2")
    return keys[0]; // Devuelve la primera clave como número de semana
  }

  calculateCompliance(player: any): string {
    let compliance = 0;
  
    // Cálculo para KM
    compliance += Math.min((player.km / 4) * 100, 100);
  
    // Cálculo para Entrenamiento
    compliance += player.entrenamiento === 'S' ? 100 : 0;
  
    // Cálculo para Iglesia
    compliance += player.iglesia === 'S' ? 100 : 0;
  
    // Cálculo para Caja Chica
    compliance += Math.min((player.cajachica / 20) * 100, 100);
  
    // Promedio de los 4 criterios
    compliance = compliance / 4;
  
    // Devuelve el porcentaje formateado
    return `${compliance.toFixed(2)}%`;
  }

  getSortedPlayers(players: any[]): any[] {
    // Calcula el cumplimiento para cada jugador y los ordena
    return players
      .map(player => ({
        ...player,
        cumplimiento: parseFloat(this.calculateCompliance(player))
      }))
      .sort((a, b) => b.cumplimiento - a.cumplimiento); // Orden descendente
  }
  
}
