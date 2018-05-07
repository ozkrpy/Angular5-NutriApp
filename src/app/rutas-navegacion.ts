import { Routes, RouterModule } from '@angular/router';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { AlimentosComponent } from './components/alimentos/alimentos.component';
import { DietasComponent } from './components/dietas/dietas.component';
import { SettingsComponent } from './settings/settings.component';

export const RutasNavegacion: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: DietasComponent },//for now, this should be a page about the items of the site
    { path: 'pacientes', component: PacientesComponent },
    { path: 'alimentos', component: AlimentosComponent },
    { path: 'settings', component:  SettingsComponent},
    { path: '**', component: DietasComponent }
    
];