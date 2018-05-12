import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbAPIService } from '../../db-api.service';
import { MatDialog } from '@angular/material';

import { ReferenciaDieta } from '../../model/referencia-dieta';

import { DietaDetalleComponent } from '../../dialogs/dieta-detalle/dieta-detalle.component';

@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.component.html',
  styleUrls: ['./dietas.component.css']
})
export class DietasComponent implements OnInit {

  todasDietas: Observable<ReferenciaDieta[]>;
  dialogResult: string = "";
  
  constructor(private ws: DbAPIService, 
              public dialog: MatDialog) { }

  ngOnInit() {
    this.recuperaDietas();
  }

  recuperaDietas() {
    this.todasDietas = this.ws.todasDietasReferencia();
  }

  verDetallesDieta(codigo: number) {
    console.log("detalles de la dieta: " + codigo);
    let dialogRef = this.dialog.open( 
                                      DietaDetalleComponent, 
                                      { width: '90%', height: '', data: codigo}
                                    );
                                    dialogRef.afterClosed().subscribe(result => {
                                                            console.log(`Dialogo cerrado: ${result}`);
                                                            this.dialogResult = result;
                                                            this.recuperaDietas();
                                    });
  }
}
