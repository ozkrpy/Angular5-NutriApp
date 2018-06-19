import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import * as moment from 'moment';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { DbAPIService } from '../../db-api.service';
import { ReferenciaDieta } from '../../model/referencia-dieta';
import { DietaAlimentos } from '../../model/dieta-alimentos';
import { AlimentoDetalle } from '../../model/alimento-detalle';
import { DIETA } from '../../model/datos-varios';

import { AgregarAlimentoDietaComponent } from '../agregar-alimento-dieta/agregar-alimento-dieta.component';

import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-dieta-detalle',
  templateUrl: './dieta-detalle.component.html',
  styleUrls: ['./dieta-detalle.component.css']
})
export class DietaDetalleComponent implements OnInit {

  // dietaReferencia: Observable<ReferenciaDieta>;
  dietaReferencia: ReferenciaDieta;
  referenciasFormGroup: FormGroup;

  dialogAddFoodResult: string = "";

  dataSource = new MatTableDataSource<DietaAlimentos>();
  displayedColumns = ['cantidad_alimento','descripcion','tipo','hidratos','proteinas','grasas','fibras','sodio','potasio','fosforo','calcio','hierro','colesterol','purinas','agua','calorias','eliminar'];
  displayedColumnsMobile = ['descripcion', 'distribucion', 'eliminar'];
  
  sumatoriaHC: number;
  sumatoriaProteinas: number;
  sumatoriaPAVB: number;
  sumatoriaGrasas: number;
  sumatoriaFibras: number;
  sumatoriaCalorias: number;
  sumatoriaSodio: number;
  sumatoriaPotasio: number;
  sumatoriaFosforo: number;
  sumatoriaCalcio: number;
  sumatoriaHierro: number;
  sumatoriaColesterol: number;
  sumatoriaPurinas: number;
  sumatoriaAgua: number;

  kcalHC: number;
  kcalProteinas: number;
  kcalGrasas: number;
  kcalFibras: number;

  constructor(
              public thisDialogRef: MatDialogRef<DietaDetalleComponent>,
              @Inject(MAT_DIALOG_DATA)
              public entrada: number,
              private ws: DbAPIService,
              public snackbar: MatSnackBar,
              public AddFoodDialog: MatDialog,
              private _formBuilder: FormBuilder) {  }

  ngOnInit() {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngAfterViewInit() {
    this.cereoSumatorias();
    this.recuperaReferenciasDieta();
    this.referenciasFormGroup = this._formBuilder.group({
      hidratosCarbonoForm: ['0.0'],//, Validators.required
      proteinasForm: ['0.0'],
      grasasForm: ['0.0'],
      fibrasForm: ['0.0'],
    });
    this.referenciasFormGroup
        .valueChanges
        .debounceTime(1000)
        .distinctUntilChanged()
        .subscribe((form: any) => {  
                                    this.ws.dietasEditReferencias(this.entrada, 
                                                                  this.referenciasFormGroup.controls.hidratosCarbonoForm.value,  
                                                                  this.referenciasFormGroup.controls.proteinasForm.value,  
                                                                  this.referenciasFormGroup.controls.grasasForm.value,  
                                                                  this.referenciasFormGroup.controls.fibrasForm.value)
                                          .subscribe(res => {
                                            this.recuperaReferenciasDieta();
                                          });  
                                  }
    );
  }
  
  recuperaReferenciasDieta() {
    this.ws.dietasReferencia(this.entrada)
           .subscribe(res => { 
                              this.dietaReferencia = res;
                              this.ws.dietasAlimentos(this.entrada)
                                     .subscribe(data => {  
                                                          this.cereoSumatorias();                                                          
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
                                                            if (entry.alimento.tipo_alimento <= 5) {
                                                              this.sumatoriaPAVB = this.sumatoriaPAVB + (entry.alimento.proteina * entry.cantidad_alimento);
                                                            }
                                                          }
                                                          // totales de kilocalorias
                                                          this.kcalHC = this.sumatoriaHC * 4;
                                                          this.kcalProteinas = this.sumatoriaProteinas * 4;
                                                          this.kcalGrasas = this.sumatoriaGrasas * 9;
                                                          this.kcalFibras = this.kcalHC + this.kcalProteinas + this.kcalGrasas;
                                                          //seteo del datasource
                                                          this.dataSource.data = data;
                                                        });
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
    let dialogRef = this.AddFoodDialog.open( 
                                              AgregarAlimentoDietaComponent, 
                                              { width: '70%', height: '70%', data: this.entrada}
                                            );
    dialogRef.afterClosed()
              .subscribe(result => {
                                    this.dialogAddFoodResult = result;
                                    this.recuperaReferenciasDieta();
    });    
  }

  quitarAlimento(item: number) {
    // console.log("quitar un alimento, dieta:", this.entrada, " item:", item);
      this.ws.dietaEliminarAlimento(this.entrada, item)
             .subscribe(res => {
                          // console.log(res);
                          this.openSnackbar(DIETA.delAlimentoOK);
                          // this.thisDialogRef.close('Delete food');
                          // this.cereoSumatorias();
                          this.recuperaReferenciasDieta();
                          // this.ngAfterViewInit();
                        }, err => {
                          // console.log("[ERROR] component PacienteDetalle", err);
                          this.openSnackbar(DIETA.delAlimentoERR);
                          // this.thisDialogRef.close('Delete food');
                          this.recuperaReferenciasDieta();
                        });
    
  }

  cereoSumatorias() {
    this.sumatoriaHC = 0.0;
    this.sumatoriaProteinas = 0.0;
    this.sumatoriaPAVB = 0.0;
    this.sumatoriaGrasas = 0.0;
    this.sumatoriaFibras = 0.0;
    this.sumatoriaCalorias = 0.0;
    this.sumatoriaSodio = 0.0;
    this.sumatoriaPotasio = 0.0;
    this.sumatoriaFosforo = 0.0;
    this.sumatoriaCalcio = 0.0;
    this.sumatoriaHierro = 0.0;
    this.sumatoriaColesterol = 0.0;
    this.sumatoriaPurinas = 0.0;
    this.sumatoriaAgua = 0.0;
  
    this.kcalHC = 0.0;
    this.kcalProteinas = 0.0;
    this.kcalGrasas = 0.0;
    this.kcalFibras = 0.0;
  }

  calculaColorHidrato (valor: number) {
    let minimo = valor - 5;
    let maximo = valor + 5;
    if (this.sumatoriaHC > maximo) {
      return 'red';
    } else if (this.sumatoriaHC < minimo) {
      return 'blue';
    }
    return 'green';
  }

  calculaColorProteina(valor: number) {
    let minimo = valor - 5;
    let maximo = valor + 5;
    if (this.sumatoriaProteinas > maximo) {
      return 'red';
    } else if (this.sumatoriaProteinas < minimo) {
      return 'blue';
    }
    return 'green';
  }

  calculaColorGrasa(valor: number) {
    let minimo = valor - 5;
    let maximo = valor + 5;
    if (this.sumatoriaGrasas > maximo) {
      return 'red';
    } else if (this.sumatoriaGrasas < minimo) {
      return 'blue';
    }
    return 'green';
  }

  calculaColorFibra(hc: number) {
    let minimo = hc * 0.95;
    let maximo = hc * 1.05;
    if (this.sumatoriaFibras > maximo) {
      return 'red';
    } else if (this.sumatoriaFibras < minimo) {
      return 'blue';
    }
    return 'green';
  }

  descargarPDF(id: number) {
      html2canvas(document.getElementById('contenido'))
                          .then(function(canvas) {
                                                    var img = canvas.toDataURL("image/png");
                                                    var doc = new jsPDF('p', 'mm', 'a2');
                                                    doc.addImage(img,'JPEG',5,20);
                                                    doc.save('Dieta_'+id+'.pdf');
                          }); 
  }

  alimentoTipo(row: any){
    if (row.alimento.tipo_alimento <= 5) {
      return 'lightblue';
    }
    
  }
}
