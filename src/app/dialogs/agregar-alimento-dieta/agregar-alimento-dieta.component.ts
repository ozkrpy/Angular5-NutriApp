import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { AlimentoDetalle } from '../../model/alimento-detalle';
import { DIETA } from '../../model/datos-varios';
import { Observable } from 'rxjs';
import { DbAPIService } from '../../db-api.service';
import { AlimentoDetalleComponent } from '../../dialogs/alimento-detalle/alimento-detalle.component';
import { FormControl, Validators } from '@angular/forms';
// import { ErrorStateMatcher } from '../../model/error-state-matcher';

@Component({
  selector: 'app-agregar-alimento-dieta',
  templateUrl: './agregar-alimento-dieta.component.html',
  styleUrls: ['./agregar-alimento-dieta.component.css']
})
export class AgregarAlimentoDietaComponent implements OnInit {
  
  dataSource = new MatTableDataSource<AlimentoDetalle>();
  displayedColumns = ['codigo', 'descripcion', 'tipo', 'medida', 'hidratos', 'proteinas', 'grasas', 'fibras', 'edicion'];
  displayedColumnsMobile = ['descripcion', 'distribucion', 'eliminar'];
  private alimentos: Observable<AlimentoDetalle[]>;
  cantidadFormControl: FormControl;

  constructor(public thisDialogRef: MatDialogRef<AgregarAlimentoDietaComponent>,
              @Inject(MAT_DIALOG_DATA)
              public dieta: number,
              private ws: DbAPIService,
              public snackbar: MatSnackBar, 
              public dialog: MatDialog,
              public AddFoodDialog: MatDialog
  ) { 
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  ngOnInit() {
    this.cantidadFormControl = new FormControl('1.0', [Validators.required, Validators.min(0.1)]);
    this.cargarAlimentos();    
  }

  ngAfterViewInit() {
  }

  cargarAlimentos() {
    this.ws.todosLosAlimentos().subscribe(data => {
      this.dataSource.data = data;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  detalleAlimento(codigo: number) {
    let dialogRef = this.dialog.open( 
                                      AlimentoDetalleComponent, 
                                      { width: '90%', height: '', data: codigo}
    );
    dialogRef.afterClosed().subscribe(result => {
                                        this.AddFoodDialog = result;
                                        this.cargarAlimentos();
    });
  }

  agregarAlimento(alimento: number, cantidad: number) {
    this.ws.dietasAgregarAlimento(this.dieta, alimento, cantidad)
           .subscribe(res => {
                              this.openSnackbar(DIETA.addAlimentoOK + this.dieta);
                              this.thisDialogRef.close('OK');});
  }

  openSnackbar(message: string) {
    this.snackbar.open(message, "OK", { duration: 4000 });
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

}
