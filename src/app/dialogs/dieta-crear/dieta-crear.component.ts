import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DbAPIService } from '../../db-api.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';

import { PacienteDetalle } from '../../model/paciente-detalle';
import { PacienteCrearComponent } from '../../dialogs/paciente-crear/paciente-crear.component';


@Component({
  selector: 'app-dieta-crear',
  templateUrl: './dieta-crear.component.html',
  styleUrls: ['./dieta-crear.component.css']
})
export class DietaCrearComponent implements OnInit {

  dietaFormGroup: FormGroup;
  pacientes: Observable<PacienteDetalle[]>;
  dialogResult: string = "";
  
  constructor(
    public thisDialogRef: MatDialogRef<DietaCrearComponent>,
    private ws: DbAPIService,
    private _formBuilder: FormBuilder,
    public snackbar: MatSnackBar, 
    public dialog: MatDialog) { }

  ngOnInit() {
    this.dietaFormGroup = this._formBuilder.group({
      paciente: ['', Validators.required],
      hidratos: ['0.0', Validators.required],
      proteinas: ['0.0', Validators.required],
      grasas: ['0.0', Validators.required],
      fibras: ['0.0', Validators.required]
    });
    this.pacientes = this.ws.todosLosPacientes();
  }

  agregarNuevaDieta() {
    this.ws.dietasRecuperaSecuencia()
           .subscribe(res => {
                              let codigoDieta = res[0]["SecuenciaDieta"];
                              this.ws.dietasAlta(codigoDieta,
                                                  this.dietaFormGroup.controls.hidratos.value,
                                                  this.dietaFormGroup.controls.proteinas.value,
                                                  this.dietaFormGroup.controls.grasas.value,
                                                  this.dietaFormGroup.controls.fibras.value,
                                                  this.dietaFormGroup.controls.paciente.value)
                                     .subscribe(res => {
                                                          console.log(res);
                                                          this.openSnackbar("Nueva dieta creada, codigo: " + codigoDieta);
                                                          this.thisDialogRef.close('OK');}
                                                       ); 
    });
  }

  openSnackbar(message: string) {
    this.snackbar.open(message, "OK", { duration: 4000 });
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
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
                                        this.pacientes = this.ws.todosLosPacientes();
    });
  }
}

