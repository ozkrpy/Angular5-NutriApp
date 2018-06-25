import { Component, OnInit } from '@angular/core';
import { DbAPIService } from '../../db-api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public retorno: string;

  constructor(private ws: DbAPIService) { }

  ngOnInit() {
  }

  actualizaIP(IP: string) {
    this.ws.setApiRoot(IP);
    this.retorno = this.ws.setApiRoot(IP);
  }

  pruebaAPI() {
    this.ws.testAPI()
           .subscribe(res => {
                              console.log(res);
                              this.retorno = res;
                              
           });
  }

}
