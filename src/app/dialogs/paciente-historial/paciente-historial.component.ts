import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DbAPIService } from '../../db-api.service';

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
          label: "Peso Actual.",
          data: this.pesosActuales,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1
        },
        {
          label: "Peso Habitual.",
          data: this.pesosHabituales,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: "Peso Ajustado.",
          data: this.pesosAjustados,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: "Peso Saludable.",
          data: this.pesosSaludables,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }
      ]
    };
    this.options = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

  // generarGrafico2() {
  //   this.type = 'line';
  //   this.data = {
  //               labels: ["January", "February", "March", "April", "May", "June", "July"],
  //               datasets: [
  //                           {
  //                             label: "My First dataset",
  //                             data: [65, 59, 80, 81, 56, 55, 40]
  //                           }
  //                         ]
  //   };
  //   this.options = {
  //     responsive: true,
  //     maintainAspectRatio: false
  //   };

  // }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

}
