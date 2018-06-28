import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { DbAPIService } from '../../db-api.service';
import { AlimentoDetalle } from '../../model/alimento-detalle';
import { Observable } from 'rxjs';
import { AlimentoDetalleComponent } from '../../dialogs/alimento-detalle/alimento-detalle.component';
import { AlimentoCrearComponent } from '../../dialogs/alimento-crear/alimento-crear.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.css']
})
export class AlimentosComponent implements OnInit {

  dialogResult: string = "";
  private alimentos: Observable<AlimentoDetalle[]>;

  dataSource = new MatTableDataSource<AlimentoDetalle>();
  displayedColumns = ['codigo', 'descripcion', 'tipo', 'medida', 'hidratos', 'proteinas', 'grasas', 'fibras', 'edicion'];
  displayedColumnsMobile = ['descripcion', 'distribucion', 'edicion'];
  loading: boolean = false;
  

  constructor(private ws: DbAPIService, 
              public dialog: MatDialog,
              public snackbar: MatSnackBar) {

  }

  ngOnInit() {
    this.cargarAlimentos();
    
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  ngAfterViewInit() {
  }

  cargarAlimentos() {
    this.loading = true;    
    this.ws.todosLosAlimentos()
           .subscribe(data => {
                                this.dataSource.data = data;
                                this.loading = false;
           }, err => {
                      console.log(err);                                  
                      this.openSnackbar(err);
                      this.loading = false;
           });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  detalleAlimento(codigo: number) {
    let dialogRef = this.dialog.open( 
                                      AlimentoDetalleComponent, 
                                      { width: '', height: '', data: codigo}
    );
    dialogRef.afterClosed().subscribe(result => {
                                        this.dialogResult = result;
                                        this.cargarAlimentos();            
    });
  }

  agregarAlimento() {
    let dialogRef = this.dialog.open( 
                                      AlimentoCrearComponent, 
                                      { width: '70%', height: ''}
    );
    dialogRef.afterClosed().subscribe(result => {
            this.dialogResult = result;
            this.cargarAlimentos();            
    });    
  }

  openSnackbar(message: string) {
    this.snackbar.open(message, "OK", { duration: 5000 });
  }
}