import { Component, OnInit, Inject } from '@angular/core';
import { DbAPIService } from '../../db-api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { AlimentoDetalle } from '../../model/alimento-detalle';
import { TipoAlimento } from '../../model/datos-varios';

@Component({
  selector: 'app-alimento-detalle',
  templateUrl: './alimento-detalle.component.html',
  styleUrls: ['./alimento-detalle.component.css']
})
export class AlimentoDetalleComponent implements OnInit {

  detalleAlimentoObservable: Observable<AlimentoDetalle>;
  modificarAlimento: boolean = true;
  tipos = TipoAlimento;
  
  constructor(
    public thisDialogRef: MatDialogRef<AlimentoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: number,
    private ws: DbAPIService,
    public snackbar: MatSnackBar) { }

  ngOnInit() {
    this.actualizaDatosAlimento();
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  editarAlimento(alimento: AlimentoDetalle, descripcion: string, tipo: number, casera: string,real: number,hidrato: number,proteina: number,grasa: number,sodio: number,potasio: number,fosforo: number,calcio: number,hierro: number,colesterol: number,purinas:number,fibra: number,agua: number,calorias: number) {
    console.log("metodo para editar detalle de alimento: " + alimento.codigo_alimento, alimento.tipo_alimento);
    console.log("descripcion:'"+ descripcion + "'", "tipo:'"+ tipo + "'", "casera:'"+ casera + "'", "real:'"+ real + "'", 
                "hidrato:'"+ hidrato + "'", "proteina:'"+ proteina + "'", "grasa:'"+ grasa + "'", "sodio:'"+ sodio + "'", 
                "potasio:'"+ potasio + "'", "fosforo:'"+ fosforo + "'", "calcio:'"+ calcio + "'", "hierro:'"+ hierro + "'", 
                "colesterol:'"+ colesterol + "'", "purinas:'"+ purinas + "'", "fibra:'"+ fibra + "'","agua:'"+ agua + "'", 
                "calorias:'"+ calorias + "'");
    if (descripcion != alimento.descripcion_alimento 
        || tipo != alimento.tipo_alimento
        || casera != alimento.medida_casera
        || real != alimento.medida_real
        || hidrato != alimento.hidratos_carbono
        || proteina != alimento.proteina
        || grasa != alimento.grasa
        || sodio != alimento.sodio
        || potasio != alimento.potasio
        || fosforo != alimento.fosforo
        || calcio != alimento.calcio
        || hierro != alimento.hierro
        || colesterol != alimento.colesterol
        || purinas != alimento.purinas
        || fibra != alimento.fibra
        || agua != alimento.agua
        || calorias != alimento.calorias) {
        console.log("existen datos con diferencias");
        this.ws.alimentoEdit(alimento.codigo_alimento,descripcion,tipo,casera,real,hidrato,proteina,grasa,sodio,potasio,fosforo,calcio,hierro,colesterol,purinas,fibra,agua,calorias)
              .subscribe(res => {
                this.openSnackbar('Los datos del alimento han sido actualizados.');
                this.actualizaDatosAlimento();
              });
    }
    this.modificarAlimento = !this.modificarAlimento;
    
  }

  actualizaDatosAlimento() {
    console.log("entro a recuperar informacion del alimento: " + this.data)
    this.detalleAlimentoObservable = this.ws.alimentoPorCodigo(this.data)
      .map(res => {
        console.log("tipo alimento:", res[0]["tipo_alimento"]);
        return res;
      });

  }

  openSnackbar(message: string) {
    this.snackbar.open(message, "OK", { duration: 5000 });
  }

  eliminarAlimento(codigo: number) {
    this.ws.eliminarAlimento(codigo)
           .subscribe(res => {
                        console.log(res);
                        this.openSnackbar('El alimento ha sido dado eliminado correctamente');
                        this.thisDialogRef.close('Delete food');
                      }, err => {
                        console.log("[ERROR] component PacienteDetalle", err);
                        this.openSnackbar('El alimento existe en dietas activas, no se puede eliminar.');
                        this.thisDialogRef.close('Delete food');
                      });
  }

}
