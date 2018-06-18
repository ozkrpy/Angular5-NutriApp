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
      hidratos: ['0.0', [Validators.required, Validators.min(0.0)]],
      proteinas: ['0.0', [Validators.required, Validators.min(0.0)]],
      grasas: ['0.0', [Validators.required, Validators.min(0.0)]],
      sodio: ['0.0', [Validators.required, Validators.min(0.0)]],
      potasio: ['0.0', [Validators.required, Validators.min(0.0)]],
      fosforo: ['0.0', [Validators.required, Validators.min(0.0)]],
      calcio: ['0.0', [Validators.required, Validators.min(0.0)]],
      hierro: ['0.0', [Validators.required, Validators.min(0.0)]],
      colesterol: ['0.0', [Validators.required, Validators.min(0.0)]],
      purinas: ['0.0', [Validators.required, Validators.min(0.0)]],
      fibras: ['0.0', [Validators.required, Validators.min(0.0)]],
      agua: ['0.0', [Validators.required, Validators.min(0.0)]],
      calorias: ['0.0', [Validators.required, Validators.min(0.0)]]
    });
  }

  agregarAlimento() {
    this.alimento = new AlimentoDetalle(null, 
                                        this.firstFormGroup.controls.descripcion.value,
                                        this.firstFormGroup.controls.tipo.value,
                                        null,//descricpcion de tipo de alimento
                                        this.firstFormGroup.controls.casera.value.trim(),
                                        this.firstFormGroup.controls.caseraMedida.value,
                                        this.firstFormGroup.controls.real.value.trim(),
                                        this.firstFormGroup.controls.realMedida.value,
                                        this.firstFormGroup.controls.hidratos.value.trim(),
                                        "g",
                                        this.firstFormGroup.controls.proteinas.value.trim(),
                                        "g",
                                        this.firstFormGroup.controls.grasas.value.trim(),
                                        "g",
                                        this.firstFormGroup.controls.sodio.value.trim(),
                                        "mg",
                                        this.firstFormGroup.controls.potasio.value.trim(),
                                        "mg",
                                        this.firstFormGroup.controls.fosforo.value.trim(),
                                        "mg",
                                        this.firstFormGroup.controls.calcio.value.trim(),
                                        "mg",
                                        this.firstFormGroup.controls.hierro.value.trim(),
                                        "mg",
                                        this.firstFormGroup.controls.colesterol.value.trim(),
                                        "mg",
                                        this.firstFormGroup.controls.purinas.value.trim(),
                                        "mg",
                                        this.firstFormGroup.controls.fibras.value.trim(),
                                        "g",
                                        this.firstFormGroup.controls.agua.value.trim(),
                                        "g",
                                        this.firstFormGroup.controls.calorias.value.trim());
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
