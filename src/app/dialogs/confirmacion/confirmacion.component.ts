import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AFIRMATIVO, NEGATIVO } from '../../model/datos-varios';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<ConfirmacionComponent>) { }

  ngOnInit() {
  }

  confirmar() {
    this.thisDialogRef.close(AFIRMATIVO);
  }
  onCloseCancel() {
    this.thisDialogRef.close(NEGATIVO);
  }

}
