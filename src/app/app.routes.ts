import { Routes } from '@angular/router';
import { PrerequisitesComponent } from './components/prerequisites/prerequisites.component';
import { HomeComponent } from './components/home/home.component';
import { PlantelComponent } from './components/plantel/plantel.component';
import { authGuard } from './guards/auth.guard'; // Importa el guard correctamente
import { FixtureComponent } from './components/fixture/fixture.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'plantel', component: PlantelComponent },
  {
    path: 'prerequisites',
    component: PrerequisitesComponent,
    canActivate: [authGuard], // Asegúrate de que este guard esté aquí
  },  
  { path: 'fixture', component: FixtureComponent, canActivate: [authGuard],  },
  { path: '**', redirectTo: '/home' },
];
