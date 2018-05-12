import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { DbAPIService } from '../../db-api.service';
import { ReferenciaDieta } from '../../model/referencia-dieta';
import { DietaAlimentos } from '../../model/dieta-alimentos';
import { AlimentoDetalle } from '../../model/alimento-detalle';

import { AgregarAlimentoDietaComponent } from '../agregar-alimento-dieta/agregar-alimento-dieta.component';

@Component({
  selector: 'app-dieta-detalle',
  templateUrl: './dieta-detalle.component.html',
  styleUrls: ['./dieta-detalle.component.css']
})
export class DietaDetalleComponent implements OnInit {

  dietaReferencia: Observable<ReferenciaDieta>;

  dialogAddFoodResult: string = "";

  dataSource = new MatTableDataSource<DietaAlimentos>();
  displayedColumns = ['numero_item','cantidad_alimento','descripcion','tipo','hidratos','proteinas','grasas','fibras','sodio','potasio','fosforo','calcio','hierro','colesterol','purinas','agua','calorias'];//, 'cantidad_alimento', 'tipo', 'medida', 'hidratos', 'proteinas', 'grasas', 'fibras', 'edicion'

  sumatoriaHC: number = 0.0;
  sumatoriaProteinas: number = 0.0;
  sumatoriaGrasas: number = 0.0;
  sumatoriaFibras: number = 0.0;
  sumatoriaCalorias: number = 0.0;
  sumatoriaSodio: number = 0.0;
  sumatoriaPotasio: number = 0.0;
  sumatoriaFosforo: number = 0.0;
  sumatoriaCalcio: number = 0.0;
  sumatoriaHierro: number = 0.0;
  sumatoriaColesterol: number = 0.0;
  sumatoriaPurinas: number = 0.0;
  sumatoriaAgua: number = 0.0;

  kcalHC: number = 0.0;
  kcalProteinas: number = 0.0;
  kcalGrasas: number = 0.0;
  kcalFibras: number = 0.0;

  constructor(
              public thisDialogRef: MatDialogRef<DietaDetalleComponent>,
              @Inject(MAT_DIALOG_DATA)
              public entrada: number,
              private ws: DbAPIService,
              public snackbar: MatSnackBar,
              public AddFoodDialog: MatDialog) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.recuperaReferenciasDieta();
  }
  
  recuperaReferenciasDieta() {
    this.dietaReferencia = this.ws.dietasReferencia(this.entrada);
    this.ws.dietasAlimentos(this.entrada)
           .subscribe(data => {
                                for (let entry of data) {
                                  // sumatorias 
                                  this.sumatoriaHC = this.sumatoriaHC + (entry.alimento.hidratos_carbono * entry.cantidad_alimento);
                                  this.sumatoriaProteinas = this.sumatoriaProteinas + (entry.alimento.proteina * entry.cantidad_alimento);
                                  this.sumatoriaGrasas = this.sumatoriaGrasas + (entry.alimento.grasa * entry.cantidad_alimento);
                                  this.sumatoriaFibras = this.sumatoriaFibras + (entry.alimento.fibra * entry.cantidad_alimento);
                                  this.sumatoriaCalorias = this.sumatoriaCalorias + (entry.alimento.calorias * entry.cantidad_alimento);
                                  this.sumatoriaSodio = this.sumatoriaSodio + (entry.cantidad_alimento * entry.alimento.sodio);
                                  this.sumatoriaPotasio = this.sumatoriaPotasio + (entry.cantidad_alimento * entry.alimento.potasio);
                                  this.sumatoriaFosforo = this.sumatoriaFosforo + (entry.cantidad_alimento * entry.alimento.fosforo);
                                  this.sumatoriaCalcio = this.sumatoriaCalcio + (entry.cantidad_alimento * entry.alimento.calcio);
                                  this.sumatoriaHierro = this.sumatoriaHierro + (entry.cantidad_alimento * entry.alimento.hierro);
                                  this.sumatoriaColesterol = this.sumatoriaColesterol + (entry.cantidad_alimento * entry.alimento.colesterol);
                                  this.sumatoriaPurinas = this.sumatoriaPurinas + (entry.cantidad_alimento * entry.alimento.purinas);
                                  this.sumatoriaAgua = this.sumatoriaAgua + (entry.cantidad_alimento * entry.alimento.agua);
                                }
                                // totales de kilocalorias
                                this.kcalHC = this.sumatoriaHC * 4;
                                this.kcalProteinas = this.sumatoriaProteinas * 4;
                                this.kcalGrasas = this.sumatoriaGrasas * 9;
                                this.kcalFibras = this.kcalHC + this.kcalProteinas + this.kcalGrasas;
                                //seteo del datasource
                                this.dataSource.data = data;
                              });
  }

  openSnackbar(message: string) {
    this.snackbar.open(message, "OK", { duration: 5000 });
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  eliminarDieta(codigo: number) {
    console.log("eliminar dieta:", codigo)
  }

  agregarAlimento() {
    console.log("agregar alimento")
      console.log("detalles de la dieta: ");
      let dialogRef = this.AddFoodDialog.open( 
                                                AgregarAlimentoDietaComponent, 
                                                { width: '65%', height: '70%', data: this.entrada}
                                             );
      dialogRef.afterClosed()
               .subscribe(result => {
                                      console.log(`Dialogo cerrado: ${result}`);
                                      this.dialogAddFoodResult = result;
                                      this.recuperaReferenciasDieta();
      });    
  }
}
