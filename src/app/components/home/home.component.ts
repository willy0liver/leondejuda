import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [RouterModule], // Importa el RouterModule aquí
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {}
