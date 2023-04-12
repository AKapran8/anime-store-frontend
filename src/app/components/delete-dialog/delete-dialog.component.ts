import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimeService } from '../anime/service/anime.service';
import { take } from 'rxjs/operators';

export interface IDeleteDialogData {
  message: string;
  type: 'ANIME' | 'HERO' | 'QUOTE';
  id: string;
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  public message: string = '';
  private _type: string = '';
  private _id: string = '';

  constructor(
    private _dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeleteDialogData,
    private _animeService: AnimeService
  ) {}

  ngOnInit(): void {
    this._initComponent();
  }

  private _initComponent(): void {
    this.message = this.data.message;
    this._type = this.data.type;
    this._id = this.data.id;
  }

  public deleteHandler(): void {
    switch (this._type) {
      case 'ANIME': {
        this._deleteAnime();
        break;
      }
      case 'HERO': {
        this._deleteHero();
        break;
      }
      case 'QUOTE': {
        this._deleteQuote();
        break;
      }
      default: {
        break;
      }
    }
    this._dialogRef.close(true);
  }

  private _deleteAnime(): void {
    this._animeService
      .deleteAnime(this._id)
      .pipe(take(1))
      .subscribe(() => {
        this._dialogRef.close(true);
      });
  }

  private _deleteHero(): void { }

  private _deleteQuote(): void { }

}
