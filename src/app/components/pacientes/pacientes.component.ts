import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { DbAPIService } from '../../db-api.service';
import { MatDialog, MatSnackBar } from '@angular/material';

import { PacienteDetalleComponent } from '../../dialogs/paciente-detalle/paciente-detalle.component';
import { PacienteCrearComponent } from '../../dialogs/paciente-crear/paciente-crear.component';

import { PacienteDetalle } from '../../model/paciente-detalle';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  loading: boolean = false;
  pacientesEmpty: boolean;
  dialogResult: string = "";
  
  todosLosPacientes: PacienteDetalle[];
  
  constructor(private ws: DbAPIService, 
              public dialog: MatDialog,
              public snackbar: MatSnackBar
             ) {
  }
 
  ngOnInit() {
    this.actualizaListaPacientes();
  }

  verDetallesPaciente(idPaciente: number) {
    let dialogRef = this.dialog.open( 
                                      PacienteDetalleComponent, 
                                      { width: '90%', height: '', data: idPaciente}
    );
    dialogRef.afterClosed().subscribe(result => {
                                        this.dialogResult = result;
                                        this.actualizaListaPacientes();
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
    this.loading = true;    
    this.pacientesEmpty = false;
    this.ws.todosLosPacientes()
           .subscribe(res => {
                              // console.log(res);
                              this.todosLosPacientes = res;
                              this.loading = false;
                              if (res.length == 0) {
                                this.pacientesEmpty = !this.pacientesEmpty;
                              };
                      }, err => {
                                  console.log(err);
                                  this.openSnackbar(err);
                                  this.loading = false;

           });
  }

  openSnackbar(message: string) {
    this.snackbar.open(message, "OK", { duration: 5000 });
  }

}
