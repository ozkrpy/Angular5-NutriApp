/* IMPORTADOS AL PROYECTO DE FORMA MANUAL */
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { FlexLayoutModule } from "@angular/flex-layout";
import {  
  MatButtonModule, 
  MatMenuModule, 
  MatToolbarModule, 
  MatIconModule, 
  MatCardModule, 
  MatGridListModule, 
  MatDialogModule,
  MatInputModule,
  MatExpansionModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,  
  MatCheckboxModule,
  MatTabsModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatDividerModule
} from '@angular/material';

/* DEFAULT IMPORTS */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { AlimentosComponent } from './components/alimentos/alimentos.component';
import { DietasComponent } from './components/dietas/dietas.component';

import { RutasNavegacion } from './rutas-navegacion';
import { DbAPIService } from './db-api.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PacienteDetalleComponent } from './dialogs/paciente-detalle/paciente-detalle.component';
import { PacienteCrearComponent } from './dialogs/paciente-crear/paciente-crear.component';
import { AlimentoDetalleComponent } from './dialogs/alimento-detalle/alimento-detalle.component';
import { AlimentoCrearComponent } from './dialogs/alimento-crear/alimento-crear.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DietaDetalleComponent } from './dialogs/dieta-detalle/dieta-detalle.component';
import { AgregarAlimentoDietaComponent } from './dialogs/agregar-alimento-dieta/agregar-alimento-dieta.component';
import { DietaCrearComponent } from './dialogs/dieta-crear/dieta-crear.component';
import { ConfirmacionComponent } from './dialogs/confirmacion/confirmacion.component';
import { HelpComponent } from './components/help/help.component';
import { PacienteHistorialComponent } from './dialogs/paciente-historial/paciente-historial.component';

import { ChartModule } from 'angular2-chartjs';


@NgModule({
  declarations: [
    AppComponent,
    PacientesComponent,
    AlimentosComponent,
    DietasComponent,
    ToolbarComponent,
    PacienteDetalleComponent,
    PacienteCrearComponent,
    AlimentoDetalleComponent,
    AlimentoCrearComponent,
    SettingsComponent,
    DietaDetalleComponent,
    AgregarAlimentoDietaComponent,
    DietaCrearComponent,
    ConfirmacionComponent,
    HelpComponent,
    PacienteHistorialComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule, 
    MatMenuModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatCardModule, 
    MatGridListModule, 
    MatDialogModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,  
    MatCheckboxModule,
    MatTabsModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatDividerModule,
    ChartModule,
    RouterModule.forRoot(RutasNavegacion, { useHash: true })
  ],
  providers: [
    DbAPIService
  ],
  entryComponents: [
    PacienteDetalleComponent,
    PacienteCrearComponent,
    AlimentoDetalleComponent,
    AlimentoCrearComponent,
    DietaDetalleComponent,
    AgregarAlimentoDietaComponent,
    DietaCrearComponent,
    ConfirmacionComponent,
    PacienteHistorialComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
