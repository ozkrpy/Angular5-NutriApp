import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbAPIService } from '../../db-api.service';
import { MatDialog } from '@angular/material';

import { PacienteDetalleComponent } from '../../dialogs/paciente-detalle/paciente-detalle.component';
import { PacienteCrearComponent } from '../../dialogs/paciente-crear/paciente-crear.component';

import { PacienteDetalle } from '../../model/paciente-detalle';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  dialogResult: string = "";
  
  todosLosPacientes: Observable<PacienteDetalle[]>;
  
  constructor(private ws: DbAPIService, 
              public dialog: MatDialog
             ) {
  }
 
  ngOnInit() {
    this.actualizaListaPacientes();
  }

  verDetallesPaciente(idPaciente: number) {
    let dialogRef = this.dialog.open( 
                                      PacienteDetalleComponent, 
                                      { width: '70%', height: '', data: idPaciente}
    );
    dialogRef.afterClosed().subscribe(result => {
                                        console.log(`Dialogo cerrado: ${result}`);
                                        this.dialogResult = result;
                                        this.actualizaListaPacientes();//this.todosLosPacientes = this.ws.todosLosPacientes();
    });
  }

  agregarPaciente() {
    console.log("agregar nuevo paciente");
    let dialogRef = this.dialog.open( 
                                     PacienteCrearComponent, 
                                     { width: '80%', height: ''}
    );
    dialogRef.afterClosed().subscribe(result => {
                                        console.log(`Dialogo cerrado: ${result}`);
                                        this.dialogResult = result;
                                        this.actualizaListaPacientes();
    });
  }

  actualizaListaPacientes() {
    this.todosLosPacientes = this.ws.todosLosPacientes();
  }

}
