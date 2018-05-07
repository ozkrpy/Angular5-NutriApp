import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
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

  // displayedColumns = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<AlimentoDetalle>();
  displayedColumns = ['codigo', 'descripcion', 'tipo', 'medida', 'hidratos', 'proteinas', 'grasas', 'fibras', 'edicion'];
  

  constructor(private ws: DbAPIService, 
              public dialog: MatDialog) {

  }

  ngOnInit() {

  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  ngAfterViewInit() {
    this.cargarAlimentos();
  }

  cargarAlimentos() {
    this.ws.todosLosAlimentos().subscribe(data => {
      this.dataSource.data = data;
      // console.log(this.dataSource.data);
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
    console.log("metodo para detalle de alimento: " + codigo);
    let dialogRef = this.dialog.open( 
                                      AlimentoDetalleComponent, 
                                      { width: '80%', height: '', data: codigo}
    );
    dialogRef.afterClosed().subscribe(result => {
                                        console.log(`Dialogo cerrado: ${result}`);
                                        this.dialogResult = result;
                                        this.cargarAlimentos();
    });
  }

  agregarAlimento() {
    console.log("metodo para alta de alimento");
    let dialogRef = this.dialog.open( 
                                      AlimentoCrearComponent, 
                                      { width: '70%', height: ''}
    );
    dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialogo cerrado: ${result}`);
            this.dialogResult = result;
    });    
  }

}