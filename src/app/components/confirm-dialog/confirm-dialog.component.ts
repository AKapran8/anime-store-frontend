import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface IData {
  message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  public message: string = '';

  constructor(
    private _dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IData,
  ) {}

  ngOnInit(): void {
    this._initComponent();
  }

  private _initComponent(): void {
    this.message = this.data.message;
  }

  public deleteHandler(): void {
    this._dialogRef.close(true);
  }
}
