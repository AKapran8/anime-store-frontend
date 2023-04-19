import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { HeroesService } from '../heroes/service/heroes.service';
import { IHeroForQuote } from '../heroes/hero.model';
import { QuotesService } from './service/quotes.service';
import { IQuote } from './quote.model';
import {
  DeleteDialogComponent,
  IDeleteDialogData,
} from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotesComponent implements OnInit {
  public heroesList: IHeroForQuote[] = [];
  public quotes: IQuote[] = [];
  constructor(
    private _cdr: ChangeDetectorRef,
    private _heroesService: HeroesService,
    private _quotesService: QuotesService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._heroesService.getHeroesListForQuote().subscribe((res) => {
      this.heroesList = res?.heroesList || [];
      this._cdr.markForCheck();
    });

    this._quotesService.getQuotes().subscribe((res) => {
      this.quotes = res.quotes;
      console.log(this.quotes);
      this._cdr.markForCheck();
    });
  }

  public addNewQuote(): void {
    const quote = {
      text: `In this world winning is everything`,
      season: 2,
      episode: 12,
      time: '18:40',
      author: {
        authorName: this.heroesList[0].text,
        id: this.heroesList[0].id,
      },
      animeId: this.heroesList[0].animeId,
    };

    this._quotesService.addQuote(quote).subscribe((res) => console.log(res));
  }

  public deleteQuote(quote: IQuote): void {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      data: {
        message: `Are you sure want to delete this quote?`,
        type: 'QUOTE',
        id: quote.id,
      } as IDeleteDialogData,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.quotes = this.quotes.filter((q) => q.id !== quote.id);
        this._cdr.markForCheck();
      }
    });
  }
}
