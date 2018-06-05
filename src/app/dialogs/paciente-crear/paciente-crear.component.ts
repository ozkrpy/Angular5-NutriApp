import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs';


import { DbAPIService } from '../../db-api.service';
import { PacienteDetalle } from '../../model/paciente-detalle';

import { SexosArray, EstadoCivil, Contextura, PACIENTE } from '../../model/datos-varios';


@Component({
  selector: 'app-paciente-crear',
  templateUrl: './paciente-crear.component.html',
  styleUrls: ['./paciente-crear.component.css']
})
export class PacienteCrearComponent implements OnInit {
  
  public loading: boolean = false;
  public showPaciente: boolean = false;
  private paciente: PacienteDetalle = null;

  pesosIdealesObsevable: Observable<Object[]>;
  sexos = SexosArray;
  estadosCiviles = EstadoCivil;

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  calculado = {codigoPaciente: null,
               pesoAjustado: 0.0,
               pesoSaludable: 0.0,
               porcentajePesoIdeal: 0.0,
               imc: 0.0,
               biotipo: "",
               pesoIdeal: 0.0,
               edad: 0};

  constructor(
    public thisDialogRef: MatDialogRef<PacienteCrearComponent>,
    private ws: DbAPIService,
    private _formBuilder: FormBuilder,
    public snackbar: MatSnackBar) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      sexo: ['', Validators.required],
      civil: ['', Validators.required],
      nacimiento: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      talla: ['', [Validators.required, Validators.min(148), Validators.max(195)]],
      actual: ['', [Validators.required, Validators.min(0.1)]],
      habitual: ['', [Validators.required, Validators.min(0.1)]],
      muneca: ['', [Validators.required, Validators.min(0.1)]],
      brazo: ['', [Validators.required, Validators.min(0.1)]],
      cintura1: ['', [Validators.required, Validators.min(0.1)]],
      cintura2: ['', [Validators.required, Validators.min(0.1)]],
    });
    this.thirdFormGroup = this._formBuilder.group({
      obesidad: [false],
      cardiopatias: [false],
      hta: [false],
      diabetes: [false],
      medicacion: [''],
      medico: [''],
      nutricionista: [''],
    });
    this.fourthFormGroup = this._formBuilder.group({
      glicemiaBasal: ['0.0', Validators.min(0)],
      creatinina: ['0.0', Validators.min(0)],
      proteinasTotales: ['0.0', Validators.min(0)],
      urea: ['0.0', Validators.min(0)],
      acidoUrico: ['0.0', Validators.min(0)],
      proteinura: ['0.0', Validators.min(0)],
      albumina: ['0.0', Validators.min(0)],
      trigliceridos: ['0.0', Validators.min(0)],
      ldl: ['0.0', Validators.min(0)],
      hdl: ['0.0', Validators.min(0)],
      colesterolTotal: ['0.0', Validators.min(0)],
      glucosa: ['0.0', Validators.min(0)],
      hb: ['0.0', Validators.min(0)],
      hematocrito: ['0.0', Validators.min(0)],
      globulosRojos: ['0.0', Validators.min(0)],
      globulosBlancos: ['0.0', Validators.min(0)],
      potasio: ['0.0', Validators.min(0)],
      ci: ['0.0', Validators.min(0)],
      sodio: ['0.0', Validators.min(0)],
      hba: ['0.0', Validators.min(0)]
    });
  }

  generarPaciente() {
    this.calcularInfoPaciente();
  }

  calcularInfoPaciente() {
    // Paso 1
    this.calculado.edad = this.calcularEdad();
    // console.log("calcular edad", this.calculado.edad);
    
    // Paso 2
    this.calculado.biotipo = this.calcularBiotipo(this.calculado.edad);
    // console.log("calcular biotipo", this.calculado.biotipo);
    
    // Paso 3
    this.calculado.imc = this.calcularImc(this.secondFormGroup.controls.actual.value, this.secondFormGroup.controls.talla.value);
    // console.log("calcular imc", this.calculado.imc);
    
    // Paso 4
    this.calcularPesoIdeal(this.calculado.edad, this.calculado.biotipo, this.firstFormGroup.controls.sexo.value, this.secondFormGroup.controls.talla.value);
    
    // Paso 5 console.log("calcular peso ajustado", this.calculado.pesoAjustado);
    
    // Paso 6 console.log("calcular porcentaje peso ideal", this.calculado.porcentajePesoIdeal);
    
  }

  // 1. Calcular Edad del Paciente
  calcularEdad() {
    var timeDiff = Math.abs(Date.now() - this.firstFormGroup.controls.nacimiento.value);
    return Math.ceil((timeDiff / (1000 * 3600 * 24)) / 365);
  }

  // 2. Calcular Biotipo 
  calcularBiotipo(edadParam: number) {
    let contextura: string = "N/C (Menor a 25 años)";
    if (edadParam >= 25) {
        let biotipoCalculado: number;
        biotipoCalculado = (this.secondFormGroup.controls.talla.value / this.secondFormGroup.controls.muneca.value);
        /*M: Hombre F: Mujer*/
        switch (this.firstFormGroup.controls.sexo.value) {
            case "M":
                contextura = this.calculoContexturaHombre(biotipoCalculado);
                break;
            case "F":
                contextura = this.calculoContexturaMujer(biotipoCalculado);
                break;
            default:
                contextura = "no calculada.";
                break;
        }
    }
    let retorno: string = contextura;
    return retorno;
  }
  // 2.1. Calcular contextura si es hombre
  calculoContexturaHombre(biotipoParametro: number) {
    let contexturaCalculada: string = null;
    if (biotipoParametro > 0) {
        if (biotipoParametro > 10.4) {
            contexturaCalculada = Contextura.pequena;
        } else if (biotipoParametro > 9.6 && biotipoParametro <= 10.4) {
            contexturaCalculada = Contextura.mediana;
        } else if (biotipoParametro < 9.6) {
            contexturaCalculada = Contextura.grande;
        }
    } else {
        contexturaCalculada = Contextura.indefinida;
    }
    return contexturaCalculada;
  }

  // 2.2. Calcular contextura si es mujer
  calculoContexturaMujer(biotipoParametro: number) {
    let contexturaCalculada: string = null;
    if (biotipoParametro > 0) {
        if (biotipoParametro > 11) {
            contexturaCalculada = Contextura.pequena;
        } else if (biotipoParametro >= 10.1 && biotipoParametro <= 11) {
            contexturaCalculada = Contextura.mediana;
        } else if (biotipoParametro < 10.1) {
            contexturaCalculada = Contextura.grande;
        }
    } else {
        contexturaCalculada = Contextura.indefinida;
    }
    return contexturaCalculada;
  }

  // 3. Calcular IMC
  calcularImc(pesoActualParam: number, tallaParam: number) {
    let meters: number = tallaParam / 100;
    return (pesoActualParam / (Math.pow(meters, 2)));
  }

  // 3.1. Indicador de IMC 
  calcularTipoImc(imcParam: number) {
    let tipo: string;
    if (imcParam < 18.5) {
        tipo = "Delgadez";
    } else if ((imcParam >= 18.5) && (imcParam <= 24.9)) {
        tipo = "Normal o sano";
    } else if ((imcParam >= 25) && (imcParam <= 29.9)) {
        tipo = "Sobrepeso";
    } else if ((imcParam >= 30) && (imcParam <= 34.9)) {
        tipo = "Obesidad Grado I";
    } else if ((imcParam >= 35) && (imcParam <= 39.9)) {
        tipo = "Obesidad Grado II";
    } else if (imcParam >= 40) {
        tipo = "Obesidad morbida";
    } else {
        tipo = " ";
    }
    return tipo;    
  }

  // 4. Calcular peso ideal / peso saludable
  calcularPesoIdeal(edad: number, biotipo: string, sexo: string, talla: number) {
    let pesoIdeal: number = 0;
    // console.log("parametros edad:", edad, "biotipo:", biotipo, "sexo:", sexo, "talla:", talla);
    this.ws.pacientePesosIdeales(sexo, talla)
          .map(
                res => { 
                  // this.loading = true;
                  // console.log("invoco al WS para recuperar pesos ideales segun sexo y talla");
                  if (this.isBetween(edad, 0, 19)) {
                    pesoIdeal = res[0]["edad17_19"];
                    // console.log("testing case 17 to 19", "Recupero peso ideal de: " + pesoIdeal);
                  } else if (this.isBetween(edad, 20, 24)) {
                    pesoIdeal = res[0]["edad20_24"];
                    // console.log("testing case 20 to 24", "Recupero peso ideal de: " + pesoIdeal);
                  } else if ((edad >= 25) && (biotipo == Contextura.pequena)) {
                    pesoIdeal = res[0]["pequena"];
                    // console.log("testing case", Contextura.pequena, "Recupero peso ideal de: " + pesoIdeal);
                  } else if ((edad >= 25) && (biotipo == Contextura.mediana)) {
                    pesoIdeal = res[0]["mediana"];
                    // console.log("testing case", Contextura.mediana, "Recupero peso ideal de: " + pesoIdeal);
                  } else if ((edad >= 25) && (biotipo == Contextura.grande)) {
                    pesoIdeal = res[0]["grande"];
                    // console.log("testing case", Contextura.grande, "Recupero peso ideal de: " + pesoIdeal);
                  } else {
                    throw new Error;
                  }
                  this.calculado.pesoSaludable = pesoIdeal;
                  return pesoIdeal;
            })
            .subscribe(res => {
                                // this.loading = false;
                                this.calcularPesoAjustadoPorcentaje(this.secondFormGroup.controls.actual.value, pesoIdeal);
                                this.pacienteDetalle();
                                this.showPaciente = true;
                              }, 
                       err => {
                                this.openSnackbar(PACIENTE.altaCalculosERR);
                                
            }); 

    return pesoIdeal;    
    
  }

  // 4.1. Auxiliar para calcular si el numero esta en un rango
  isBetween(x: number, lower: number, upper: number) {
    return lower <= x && x <= upper;
  }

  // 5. Calcular peso ajustado 
  // 6. Calcular porcentaje de peso ideal
  calcularPesoAjustadoPorcentaje(pesoActualParam: number, pesoIdealParam: number) {
    // console.log("calcular peso ajustado y porcentaje de peso ideal", pesoActualParam, pesoIdealParam);
    if ((pesoActualParam != 0) && (pesoIdealParam != 0)) {
      // console.log("calcularPesoAjustadoPorcentaje datos entrada - peso actual: " + pesoActualParam + " peso ideal: " + pesoIdealParam + " peso ajustado: " + this.calculado.pesoAjustado, "porcentaje peso ideal:", this.calculado.porcentajePesoIdeal);
      this.calculado.pesoAjustado = ((pesoActualParam - pesoIdealParam) * 0.25 + pesoIdealParam);
      this.calculado.porcentajePesoIdeal = (pesoActualParam / pesoIdealParam) * 100;
    }
    // console.log("calcularPesoAjustadoPorcentaje datos entrada - peso actual: " + pesoActualParam + " peso ideal: " + pesoIdealParam + " peso ajustado: " + this.calculado.pesoAjustado, "porcentaje peso ideal:", this.calculado.porcentajePesoIdeal);
  }

  // Compila todos los datos del paciente
  pacienteDetalle() {
    if (this.calculado.pesoSaludable != 0.0) {
      this.paciente  = new PacienteDetalle( 
        null, //codigoPaciente
        this.firstFormGroup.controls.nombre.value,
        this.firstFormGroup.controls.apellido.value,
        this.firstFormGroup.controls.sexo.value,
        this.secondFormGroup.controls.talla.value,
        this.firstFormGroup.controls.civil.value,
        this.firstFormGroup.controls.nacimiento.value,
        this.secondFormGroup.controls.actual.value,
        this.secondFormGroup.controls.habitual.value,
        this.calculado.pesoAjustado, //pesoAjustado,
        this.calculado.pesoSaludable, //pesoSaludable,
        this.calculado.porcentajePesoIdeal, //porcentajePesoIdeal,
        this.calculado.imc, //imc,
        this.secondFormGroup.controls.muneca.value,
        this.secondFormGroup.controls.brazo.value,
        this.calculado.biotipo, //biotipo,
        this.thirdFormGroup.controls.obesidad.value,
        this.thirdFormGroup.controls.cardiopatias.value,
        this.thirdFormGroup.controls.hta.value,
        this.thirdFormGroup.controls.diabetes.value,
        this.thirdFormGroup.controls.medicacion.value,
        this.thirdFormGroup.controls.medico.value,
        this.thirdFormGroup.controls.nutricionista.value,
        this.fourthFormGroup.controls.glicemiaBasal.value,
        this.fourthFormGroup.controls.creatinina.value,
        this.fourthFormGroup.controls.proteinasTotales.value,
        this.fourthFormGroup.controls.urea.value,
        this.fourthFormGroup.controls.acidoUrico.value,
        this.fourthFormGroup.controls.proteinura.value,
        this.fourthFormGroup.controls.albumina.value,
        this.fourthFormGroup.controls.trigliceridos.value,
        this.fourthFormGroup.controls.ldl.value,
        this.fourthFormGroup.controls.hdl.value,
        this.fourthFormGroup.controls.colesterolTotal.value,
        this.fourthFormGroup.controls.glucosa.value,
        this.fourthFormGroup.controls.hb.value,
        this.fourthFormGroup.controls.hematocrito.value,
        this.fourthFormGroup.controls.globulosRojos.value,
        this.fourthFormGroup.controls.globulosBlancos.value,
        this.fourthFormGroup.controls.potasio.value,
        this.fourthFormGroup.controls.ci.value,
        this.fourthFormGroup.controls.sodio.value,
        this.fourthFormGroup.controls.hba.value,
        this.secondFormGroup.controls.cintura1.value,
        this.secondFormGroup.controls.cintura2.value    
      );
      // console.log(this.paciente);
    }
  } 

  // Alta del paciente creado
  crearPaciente() {
    this.loading = true;
    this.ws.pacienteAlta(this.paciente)
          .subscribe(res => {
                                // console.log("resultado del subscribe paciente alta");
                                this.openSnackbar(PACIENTE.altaOK);
                                this.loading = false;
                                this.thisDialogRef.close('Alta Paciente OK');
                              }, err => {
                                console.log("[ERROR] component crearPaciente", err);
                                this.openSnackbar(PACIENTE.altaERR);
                                this.loading = false;
                                this.thisDialogRef.close('Error al registrar paciente');
                              }
                    );
  }

  openSnackbar(message: string) {
    this.snackbar.open(message, "OK", { duration: 4000 });
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
