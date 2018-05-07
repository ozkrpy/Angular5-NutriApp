import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbAPIService } from '../../db-api.service';

import { ReferenciaDieta } from '../../model/referencia-dieta';

@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.component.html',
  styleUrls: ['./dietas.component.css']
})
export class DietasComponent implements OnInit {

  todasDietas: Observable<ReferenciaDieta[]>;
  constructor(private ws: DbAPIService) { }

  ngOnInit() {
    this.recuperaDietas();
  }

  recuperaDietas() {
    this.todasDietas = this.ws.todasDietasReferencia();
  }
}
