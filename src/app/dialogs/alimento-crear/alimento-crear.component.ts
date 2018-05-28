import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { DbAPIService } from '../../db-api.service';

import { TipoAlimento, MedidasCaseras, MedidasReal, Gramos } from '../../model/datos-varios';
import { AlimentoDetalle } from '../../model/alimento-detalle';
import { ALIMENTO } from '../../model/datos-varios';

@Component({
  selector: 'app-alimento-crear',
  templateUrl: './alimento-crear.component.html',
  styleUrls: ['./alimento-crear.component.css']
})
export class AlimentoCrearComponent implements OnInit {
  
  // Formulario agrupado
  firstFormGroup: FormGroup;
  // Opciones para el ddl
  tiposAlimento = TipoAlimento;
  medidasCaseras = MedidasCaseras;
  medidasReal = MedidasReal;
  gramos = Gramos;
  // Alimento generado a partir de la informacion ingresada
  alimento: AlimentoDetalle;
  
  constructor(
    public thisDialogRef: MatDialogRef<AlimentoCrearComponent>,
    private ws: DbAPIService,
    private _formBuilder: FormBuilder,
    public snackbar: MatSnackBar) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      casera: ['', Validators.required],
      caseraMedida: ['', Validators.required],
      real: ['', Validators.required],
      realMedida: ['', Validators.required],
      hidratos: ['', Validators.required],
      proteinas: ['', Validators.required],
      grasas: ['', Validators.required],
      sodio: ['', Validators.required],
      potasio: ['', Validators.required],
      fosforo: ['', Validators.required],
      calcio: ['', Validators.required],
      hierro: ['', Validators.required],
      colesterol: ['', Validators.required],
      purinas: ['', Validators.required],
      fibras: ['', Validators.required],
      agua: ['', Validators.required],
      calorias: ['', Validators.required]
    });
  }

  agregarAlimento() {
    this.alimento = new AlimentoDetalle(null, 
                                        this.firstFormGroup.controls.descripcion.value,
                                        this.firstFormGroup.controls.tipo.value,
                                        null,//descricpcion de tipo de alimento
                                        this.firstFormGroup.controls.casera.value,
                                        this.firstFormGroup.controls.caseraMedida.value,
                                        this.firstFormGroup.controls.real.value,
                                        this.firstFormGroup.controls.realMedida.value,
                                        this.firstFormGroup.controls.hidratos.value,
                                        "g",
                                        this.firstFormGroup.controls.proteinas.value,
                                        "g",
                                        this.firstFormGroup.controls.grasas.value,
                                        "g",
                                        this.firstFormGroup.controls.sodio.value,
                                        "mg",
                                        this.firstFormGroup.controls.potasio.value,
                                        "mg",
                                        this.firstFormGroup.controls.fosforo.value,
                                        "mg",
                                        this.firstFormGroup.controls.calcio.value,
                                        "mg",
                                        this.firstFormGroup.controls.hierro.value,
                                        "mg",
                                        this.firstFormGroup.controls.colesterol.value,
                                        "mg",
                                        this.firstFormGroup.controls.purinas.value,
                                        "mg",
                                        this.firstFormGroup.controls.fibras.value,
                                        "g",
                                        this.firstFormGroup.controls.agua.value,
                                        "g",
                                        this.firstFormGroup.controls.calorias.value);
    this.ws.alimentoAlta(this.alimento)
           .subscribe(res => {
                              console.log(res);
                              this.openSnackbar(ALIMENTO.altaOK + this.firstFormGroup.controls.descripcion.value);
                              this.thisDialogRef.close('OK');}); 
  }

  openSnackbar(message: string) {
    this.snackbar.open(message, "OK", { duration: 4000 });
  }
}
