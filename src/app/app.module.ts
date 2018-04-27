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
  MatSortModule
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



@NgModule({
  declarations: [
    AppComponent,
    PacientesComponent,
    AlimentosComponent,
    DietasComponent,
    ToolbarComponent,
    PacienteDetalleComponent,
    PacienteCrearComponent
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
    RouterModule.forRoot(RutasNavegacion, { useHash: true })
  ],
  providers: [
    DbAPIService
  ],
  entryComponents: [
    PacienteDetalleComponent,
    PacienteCrearComponent,
    // AlimentosDetalleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
