import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

import { AnimeService } from '../anime/service/anime.service';
import { HeroesService } from '../heroes/service/heroes.service';
import { QuotesService } from '../quotes/service/quotes.service';
import { SnackbarService } from '../snackbar/snackbar.service';

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
  public type: string = '';

  private _id: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDeleteDialogData,
    private _dialogRef: MatDialogRef<DeleteDialogComponent>,
    private _animeService: AnimeService,
    private _heroesService: HeroesService,
    private _quotesService: QuotesService,
    private _snackbarService: SnackbarService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._initComponent();
  }

  private _initComponent(): void {
    this.message = this.data.message;
    this.type = this.data.type;
    this._id = this.data.id;

    this._cdr.markForCheck();
  }

  public deleteHandler(): void {
    this.isDeleting = true;

    switch (this.type) {
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
  }

  private _deleteAnime(): void {
    this._animeService
      .deleteAnime(this._id)
      .pipe(take(1))
      .subscribe(() => {
        this.isDeleting = false;
        this._dialogRef.close(true);
        this._snackbarService.createSuccessSnackbar('Anime was deleted');
      });
  }

  private _deleteHero(): void {
    this._heroesService
      .deleteHero(this._id)
      .pipe(take(1))
      .subscribe(() => {
        this.isDeleting = false;
        this._dialogRef.close(true);
        this._snackbarService.createSuccessSnackbar('Hero was deleted');
      });
  }

  private _deleteQuote(): void {
    this._quotesService
      .deleteQuote(this._id)
      .pipe(take(1))
      .subscribe(() => {
        this.isDeleting = false;
        this._dialogRef.close(true);
        this._snackbarService.createSuccessSnackbar('Quote was deleted');
      });
  }
}
