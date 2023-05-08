import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { HeroesService } from '../../heroes/service/heroes.service';
import { QuotesService } from '../service/quotes.service';
import { IAddEditQuoteDialogData, IAddEditQuote } from '../quote.model';
import { SnackbarService } from '../../snackbar/snackbar.service';

@Component({
  selector: 'app-add-edit-quote',
  templateUrl: './add-edit-quote.component.html',
  styleUrls: ['./add-edit-quote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditQuoteComponent implements OnInit {
  public form: FormGroup | null = null;
  public title: string = '';
  public areHeroesListFetching: boolean = false;
  public heroesList: { id: string; text: string }[] = [];
  public isSaving: boolean = false;

  private _quoteId: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IAddEditQuoteDialogData,
    private _dialogRef: MatDialogRef<AddEditQuoteComponent>,
    private _quotesService: QuotesService,
    private _heroesService: HeroesService,
    private _snackbarService: SnackbarService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._initComponent();
    this._initForm();
    this._getHeroesList();
  }

  private _initComponent(): void {
    if (this.data.type === 'add') {
      this.title = `Add New Quote`;
    } else {
      this.title = `Edit Quote`;
      this._quoteId = this.data.quoteId || '';
    }
    this._cdr.markForCheck();
  }

  private _initForm(): void {
    this.form = new FormGroup({
      text: new FormControl(this.data?.initialValue?.text || '', [
        Validators.required,
      ]),
      season: new FormControl(this.data?.initialValue?.season || null, [
        Validators.required,
        Validators.min(1),
      ]),
      episode: new FormControl(this.data?.initialValue?.episode || null, [
        Validators.required,
        Validators.min(1),
      ]),
      time: new FormControl(this.data?.initialValue?.time || '', [
        Validators.required,
      ]),
      author: new FormControl(this.data?.initialValue?.author.id || '', [
        Validators.required,
      ]),
    });
  }

  private _getHeroesList(): void {
    this.areHeroesListFetching = true;
    this._cdr.markForCheck();

    this._heroesService
      .getHeroesListForQuote()
      .pipe(take(1))
      .subscribe((response) => {
        this.heroesList = response.heroesList;
        this.areHeroesListFetching = false;
        this._cdr.markForCheck();
      });
  }

  public saveHandler(): void {
    if (!this.form?.valid) return;

    this.isSaving = true;

    const author = this.heroesList.find(
      (e) => e.id === this.form?.value.author
    );

    const requiestBody: IAddEditQuote = {
      text: this.form?.value.text.trim(),
      season: this.form?.value.season,
      episode: this.form?.value.episode,
      time: this.form?.value.time,
      author: { authorName: author!.text, id: author!.id },
    };

    if (this.data.type === 'add') this._save(requiestBody);
    if (this.data.type === 'edit') this._edit(requiestBody);
    this._cdr.markForCheck();
  }

  private _save(body: IAddEditQuote): void {
    this._quotesService
      .addQuote(body)
      .pipe(take(1))
      .subscribe((res) => {
        this.isSaving = false;
        this._dialogRef.close(res.quote);
        this._snackbarService.createSuccessSnackbar(`Quote was added`);
      });
  }

  private _edit(requiestBody: IAddEditQuote): void {
    this._quotesService
      .editQuote(requiestBody, this._quoteId)
      .pipe(take(1))
      .subscribe((res) => {
        this.isSaving = false;
        this._dialogRef.close(res.quote);
        this._snackbarService.createSuccessSnackbar(`Quote was edited`);
      });
  }
}
