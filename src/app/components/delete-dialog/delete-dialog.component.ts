import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent implements OnInit {
  public isDeleting: boolean = false;
  public message: string = '';
  private _type: string = '';
  private _id: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDeleteDialogData,
    private _dialogRef: MatDialogRef<DeleteDialogComponent>,
    private _animeService: AnimeService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._initComponent();
  }

  private _initComponent(): void {
    this.message = this.data.message;
    this._type = this.data.type;
    this._id = this.data.id;

    this._cdr.markForCheck();
  }

  public deleteHandler(): void {
    this.isDeleting = true;

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
        this.isDeleting = false;
        this._cdr.markForCheck();
        break;
      }
    }
    this._cdr.markForCheck();
  }

  private _deleteAnime(): void {
    this._animeService
      .deleteAnime(this._id)
      .pipe(take(1))
      .subscribe(() => {
        this.isDeleting = false;
        this._dialogRef.close(true);
        this._cdr.markForCheck();
      });
  }

  private _deleteHero(): void {}

  private _deleteQuote(): void {}
}
