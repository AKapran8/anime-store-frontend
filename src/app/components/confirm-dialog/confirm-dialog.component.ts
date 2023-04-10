import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimeService } from '../anime/service/anime.service';
import { take } from 'rxjs/operators';

interface IData {
  message: string;
  id: number;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  public message: string = '';
  private _animeId: number | null = null;

  constructor(
    private _dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IData,
    private _animeService: AnimeService
  ) {}

  ngOnInit(): void {
    this._initComponent();
  }

  private _initComponent(): void {
    this.message = this.data.message;
    this._animeId = this.data.id;
  }

  public deleteHandler(): void {
    if (this._animeId) {
      this._animeService
        .deleteAnime(this._animeId)
        .pipe(take(1))
        .subscribe((res) => {
          this._dialogRef.close(true);
        });
    }
  }
}
