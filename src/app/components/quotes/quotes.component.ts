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

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotesComponent implements OnInit {
  public userId: string = '';
  public quotes: IQuote[] = [];

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
