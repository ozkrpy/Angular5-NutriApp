import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DbAPIService } from '../../db-api.service';
import { PACIENTE } from '../../model/datos-varios';

@Component({
  selector: 'app-paciente-historial',
  templateUrl: './paciente-historial.component.html',
  styleUrls: ['./paciente-historial.component.css']
})
export class PacienteHistorialComponent implements OnInit {
  //DECLARAR VARIABLES DE CREACION DE ESTADISTICA
  type: string;
  data: any;
  options: any;
  pesosActuales: Array<number> = [];
  pesosHabituales: Array<number> = [];
  pesosAjustados: Array<number> = [];
  pesosSaludables: Array<number> = [];
  fechas: Array<String> = [];

  constructor(public thisDialogRef: MatDialogRef<PacienteHistorialComponent>,
              @Inject(MAT_DIALOG_DATA)
              public datosEntrada: any,
              private ws: DbAPIService,
              public snackbar: MatSnackBar) { }

  ngOnInit() {
    this.ws.pacienteHistorial(this.datosEntrada.codigo)
           .subscribe(res => {
                              // EN CASO QUE HAYAN RESULTADOS, INCLUIRLOS EN LA LISTA.
                              for (let entry of res) {
                                this.pesosActuales.push(entry.peso_actual);
                                this.pesosHabituales.push(entry.peso_habitual);
                                this.pesosAjustados.push(entry.peso_ajusta);
                                this.pesosSaludables.push(entry.peso_saludable);
                                this.fechas.push(new Date(entry.fecha).toLocaleDateString());
                              }
                              this.generarGrafico();
           }) 
  }

  generarGrafico() {
    this.pesosActuales.push(this.datosEntrada.actual);
    this.pesosHabituales.push(this.datosEntrada.habitual);
    this.pesosAjustados.push(this.datosEntrada.ajustado);
    this.pesosSaludables.push(this.datosEntrada.saludable);
    this.fechas.push('Hoy');

    this.type = 'line';
    this.data = {
      labels: this.fechas,
      datasets: [
        {
          label: PACIENTE.graficoTitulos.pesoActual,
          data: this.pesosActuales,
          backgroundColor: PACIENTE.graficoColores.fondoRojo,
          borderColor: PACIENTE.graficoColores.bordeRojo,
          borderWidth: 1
        },
        {
          label: PACIENTE.graficoTitulos.pesoHabitual,
          data: this.pesosHabituales,
          backgroundColor: PACIENTE.graficoColores.fondoCeleste,
          borderColor: PACIENTE.graficoColores.bordeCeleste,
          borderWidth: 1
        },
        {
          label: PACIENTE.graficoTitulos.pesoAjustado,
          data: this.pesosAjustados,
          backgroundColor: PACIENTE.graficoColores.fondoVerde,
          borderColor: PACIENTE.graficoColores.bordeVerde,
          borderWidth: 1
        },
        {
          label: PACIENTE.graficoTitulos.pesoSaludable,
          data: this.pesosSaludables,
          backgroundColor: PACIENTE.graficoColores.fondoVioleta,
          borderColor: PACIENTE.graficoColores.bordeVioleta,
          borderWidth: 1
        }
      ]
    };
    this.options = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

}
