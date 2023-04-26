import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { HeroesService } from '../heroes/service/heroes.service';
import { QuotesService } from './service/quotes.service';

import { IHeroForQuote } from '../heroes/hero.model';
import { IAddEditQuote, IAddEditQuoteDialogData, IQuote } from './quote.model';

import {
  DeleteDialogComponent,
  IDeleteDialogData,
} from '../delete-dialog/delete-dialog.component';
import { AddEditQuoteComponent } from './add-edit-quote/add-edit-quote.component';

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
      this._cdr.markForCheck();
    });
  }

  public addNewQuote(): void {
    const dialogRef = this._dialog.open(AddEditQuoteComponent, {
      data: { type: 'add' } as IAddEditQuoteDialogData,
    });

    dialogRef.afterClosed().subscribe((quote: IQuote) => {
      if (quote) {
        this.quotes.push(quote);
        this._cdr.markForCheck();
      }
    });
  }

  public editQuote(quote: IQuote): void {
    const editableQuote: IAddEditQuote = {
      text: quote.text,
      season: quote.season,
      episode: quote.episode,
      time: quote.time,
      author: {
        authorName: quote.author.authorName,
        id: quote.author.id,
      },
    };

    const dialogRef = this._dialog.open(AddEditQuoteComponent, {
      data: {
        type: 'edit',
        quoteId: quote.id,
        initialValue: editableQuote,
      } as IAddEditQuoteDialogData,
    });

    dialogRef.afterClosed().subscribe((editableQuote: IQuote) => {
      this.quotes = this.quotes.map((q: IQuote) => {
        if (q.id === editableQuote.id) return editableQuote;
        return q;
      });
      this._cdr.markForCheck();
    });
  }

  public deleteQuote(quote: IQuote): void {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      data: {
        message: `Are you sure want to delete ${quote.author.authorName}'s quote?`,
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
