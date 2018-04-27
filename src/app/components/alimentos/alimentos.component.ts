import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DbAPIService } from '../../db-api.service';
import { AlimentoDetalle } from '../../model/alimento-detalle';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.css']
})
export class AlimentosComponent implements OnInit {

  private alimentos: Observable<AlimentoDetalle[]>;

  // displayedColumns = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<AlimentoDetalle>();
  displayedColumns = ['codigo', 'descripcion', 'tipo', 'medida', 'hidratos', 'proteinas', 'grasas', 'fibras', 'edicion'];
  

  constructor(private ws: DbAPIService) {

  }

  ngOnInit() {

  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
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
  
}