import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

import { QuotesService } from './service/quotes.service';

import { IAddEditQuote, IAddEditQuoteDialogData, IQuote } from './quote.model';

import {
  DeleteDialogComponent,
  IDeleteDialogData,
} from '../delete-dialog/delete-dialog.component';
import { AddEditQuoteComponent } from './add-edit-quote/add-edit-quote.component';
import { AuthService } from '../auth/service/auth.service';

interface ITableData {
  text: string;
  season: number;
  episode: number;
  timeline: string;
  authorName: string;
  authorId: string;
  id: string;
}
@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotesComponent implements OnInit {
  public userId: string = '';
  private _quotes: IQuote[] = [];
  public quotes: ITableData[] = [];

  constructor(
    private _cdr: ChangeDetectorRef,
    private _quotesService: QuotesService,
    private _authService: AuthService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._getUserInfo();
    this._getQuotes();
  }

  private _getUserInfo(): void {
    this.userId = this._authService.getUserAuth().userId;
    this._cdr.markForCheck();
  }

  private _getQuotes(): void {
    this._quotesService
      .getQuotes()
      .pipe(take(1))
      .subscribe((res) => {
        this._quotes = [...res.quotes];
        this._modifyTableData();
        this._cdr.markForCheck();
      });
  }

  private _modifyTableData(): void {
    this.quotes = this._quotes.map((q) => {
      const quote = {
        text: q.text,
        season: q.season,
        episode: q.episode,
        timeline: q.time,
        authorName: q.author.authorName,
        authorId: q.author.id,
        id: q.id,
      };

      return quote;
    });
    this._cdr.markForCheck();
  }

  public addNewQuote(): void {
    const dialogRef = this._dialog.open(AddEditQuoteComponent, {
      data: { type: 'add' } as IAddEditQuoteDialogData,
    });

    dialogRef.afterClosed().subscribe((quote: IQuote) => {
      if (quote) {
        this._quotes.push(quote);
        this._modifyTableData();
      }
    });
  }

  public editQuote(quote: ITableData): void {
    const editableQuote: IAddEditQuote = {
      text: quote.text,
      season: quote.season,
      episode: quote.episode,
      time: quote.timeline,
      author: {
        authorName: quote.authorName,
        id: quote.authorId,
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
      this._quotes = this._quotes.map((q: IQuote) => {
        if (q.id === editableQuote.id) return editableQuote;
        return q;
      });
      this._modifyTableData();
    });
  }

  public deleteQuote(quote: ITableData): void {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      data: {
        message: `Are you sure want to delete ${quote.authorName}'s quote?`,
        type: 'QUOTE',
        id: quote.id,
      } as IDeleteDialogData,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this._quotes = this._quotes.filter((q) => q.id !== quote.id);
        this._modifyTableData();
      }
    });
  }
}
