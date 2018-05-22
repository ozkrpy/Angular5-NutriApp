import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbAPIService } from '../../db-api.service';
import { MatDialog, MatSnackBar } from '@angular/material';

import { ReferenciaDieta } from '../../model/referencia-dieta';

import { DietaDetalleComponent } from '../../dialogs/dieta-detalle/dieta-detalle.component';
import { DietaCrearComponent } from '../../dialogs/dieta-crear/dieta-crear.component';

import { ConfirmacionComponent } from '../../dialogs/confirmacion/confirmacion.component';
import { AFIRMATIVO, NEGATIVO } from '../../model/datos-varios';

@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.component.html',
  styleUrls: ['./dietas.component.css']
})
export class DietasComponent implements OnInit {

  todasDietas: Observable<ReferenciaDieta[]>;
  dialogResult: string = "";
  
  constructor(private ws: DbAPIService, 
              public dialog: MatDialog,
              public snackbar: MatSnackBar) { }

  ngOnInit() {
    this.recuperaDietas();
  }

  recuperaDietas() {
    this.todasDietas = this.ws.todasDietasReferencia();
  }

  verDetallesDieta(codigo: number) {
    // console.log("detalles de la dieta: " + codigo);
    let dialogRef = this.dialog.open( 
                                      DietaDetalleComponent, 
                                      { width: '90%', height: '100%', data: codigo}
                                    );
    dialogRef.afterClosed()
             .subscribe(result => {
                                    // console.log(`Dialogo cerrado: ${result}`);
                                    this.dialogResult = result;
                                    this.recuperaDietas();
    });
  }

  eliminarDietaCompleta(codigo: number) {
    let dialogRef = this.dialog.open( 
                                      ConfirmacionComponent, 
                                      { width: '20%', height: '', data: codigo}
                                    );
    dialogRef.afterClosed()
              .subscribe(result => {
                  console.log(`Dialogo cerrado: ${result}`);
                  this.dialogResult = result;
                  if(this.dialogResult == AFIRMATIVO) {
                    this.ws.dietaEliminarTotal(codigo)
                            .subscribe(res => {
                                                console.log(res);
                                                this.openSnackbar('La dieta se ha eliminado correctamente');
                                                this.recuperaDietas();
                                                //  this.thisDialogRef.close('Delete patient');
                            }, err => {
                                        console.log("[ERROR] component Dietas", err);
                                        this.openSnackbar('Ocurrio un error, favor contactar al soporte.');
                                        //  this.thisDialogRef.close('Delete patient');
                            });
                  }
              });
    
  }

  openSnackbar(message: string) {
    this.snackbar.open(message, "OK", { duration: 5000 });
  }

  agregarNuevaDieta() {
    console.log("metodo para alta de dieta");
    let dialogRef = this.dialog.open( 
                                      DietaCrearComponent, 
                                      { width: '60%', height: ''}
    );
    dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialogo cerrado: ${result}`);
            this.dialogResult = result;
            this.recuperaDietas();
    }); 
  }
}
