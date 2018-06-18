import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbAPIService } from '../../db-api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { AlimentoDetalle } from '../../model/alimento-detalle';
import { TipoAlimento } from '../../model/datos-varios';

import { ConfirmacionComponent } from '../../dialogs/confirmacion/confirmacion.component';
import { AFIRMATIVO, NEGATIVO, ALIMENTO } from '../../model/datos-varios';

@Component({
  selector: 'app-alimento-detalle',
  templateUrl: './alimento-detalle.component.html',
  styleUrls: ['./alimento-detalle.component.css']
})
export class AlimentoDetalleComponent implements OnInit {

  detalleAlimentoObservable: AlimentoDetalle;
  // modificarAlimento: boolean = true;
  tipos = TipoAlimento;
  dialogResult: string = "";
  formulario: FormGroup;

  constructor(
    public thisDialogRef: MatDialogRef<AlimentoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: number,
    private ws: DbAPIService,
    public snackbar: MatSnackBar, 
    public dialog: MatDialog,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.actualizaDatosAlimento();   
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  editarAlimento() {
    this.formulario.enable();
      if (!!this.formulario && this.formulario.dirty) {//asegura que formulario no sea nulo y que no se haya modificado
        this.ws.alimentoEdit(this.data,
                             this.formulario.controls.descripcion.value,
                             this.formulario.controls.tipo.value,
                             this.formulario.controls.casera.value,
                             this.formulario.controls.real.value,
                             this.formulario.controls.hidratos.value,
                             this.formulario.controls.proteinas.value,
                             this.formulario.controls.grasas.value,
                             this.formulario.controls.sodio.value,
                             this.formulario.controls.potasio.value,
                             this.formulario.controls.fosforo.value,
                             this.formulario.controls.calcio.value,
                             this.formulario.controls.hierro.value,
                             this.formulario.controls.colesterol.value,
                             this.formulario.controls.purinas.value,
                             this.formulario.controls.fibras.value,
                             this.formulario.controls.agua.value,
                             this.formulario.controls.calorias.value)
               .subscribe(res => {
                                  this.openSnackbar(ALIMENTO.updateDatosOK);
                                  this.actualizaDatosAlimento();
                                  this.formulario.disable();
                                }, err => {
                                            console.log(err);                                  
                                            this.openSnackbar(ALIMENTO.updateDatosERR);
                                });    
      }    
  }

  actualizaDatosAlimento() {
    this.ws.alimentoPorCodigo(this.data)
           .subscribe(res => {
                              this.detalleAlimentoObservable = res;    
                              this.formulario = this._formBuilder.group({
                                                  descripcion: [res[0].descripcion_alimento, Validators.required],
                                                  tipo: [res[0].tipo_alimento, Validators.required],
                                                  casera: [res[0].medida_casera, Validators.required],
                                                  real: [res[0].medida_real, Validators.required],
                                                  hidratos: [res[0].hidratos_carbono, [Validators.required, Validators.min(0.0)]],
                                                  proteinas: [res[0].proteina, [Validators.required, Validators.min(0.0)]],
                                                  grasas: [res[0].grasa, [Validators.required, Validators.min(0.0)]],
                                                  sodio: [res[0].sodio, [Validators.required, Validators.min(0.0)]],
                                                  potasio: [res[0].potasio, [Validators.required, Validators.min(0.0)]],
                                                  fosforo: [res[0].fosforo, [Validators.required, Validators.min(0.0)]],
                                                  calcio: [res[0].calcio, [Validators.required, Validators.min(0.0)]],
                                                  hierro: [res[0].hierro, [Validators.required, Validators.min(0.0)]],
                                                  colesterol: [res[0].colesterol, [Validators.required, Validators.min(0.0)]],
                                                  purinas: [res[0].purinas, [Validators.required, Validators.min(0.0)]],
                                                  fibras: [res[0].fibra, [Validators.required, Validators.min(0.0)]],
                                                  agua: [res[0].agua, [Validators.required, Validators.min(0.0)]],
                                                  calorias: [res[0].calorias, [Validators.required, Validators.min(0.0)]]
                              });
                              this.formulario.disable();
           }); 
  }

  openSnackbar(message: string) {
    this.snackbar.open(message, "OK", { duration: 5000 });
  }

  eliminarAlimento(codigo: number) {
    let confirmacionRef = this.dialog.open( 
                                      ConfirmacionComponent, 
                                      { width: '', height: '', data: ''}
                                    );
    confirmacionRef.afterClosed()
                .subscribe(result => {
                                        console.log(`Dialogo cerrado: ${result}`);
                                        this.dialogResult = result;
                                        if(this.dialogResult == AFIRMATIVO) {
                                          this.ws.eliminarAlimento(codigo)
                                                  .subscribe(res => {
                                                                console.log(res);
                                                                this.openSnackbar(ALIMENTO.deleteOK);
                                                                this.thisDialogRef.close('Delete food OK');
                                                              }, err => {
                                                                console.log("[ERROR] component AlimentoDetalleComponent", err);
                                                                this.openSnackbar(ALIMENTO.deleteERR);
                                                                this.thisDialogRef.close('Delete food ERR');
                                                              });
                                        }
                });



    
  }

  /* WORKAROUND PARA QUE MAT-SELECT SETEE EL VALOR RECUPERADO DE LA LISTA */
  compareByValue = true;
  compareObjectsByValue(d1: {value: string}, d2: {value: string}) {
    return d1 && d2 && d1.value === d2.value;
  }
  compareByReference(o1: any, o2: any) {
    return o1 === o2;
  }

}
