import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAddEditAnime } from '../model';

@Component({
  selector: 'app-add-anime',
  templateUrl: './add-anime.component.html',
  styleUrls: ['./add-anime.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAnimeComponent implements OnInit {
  public form: FormGroup | null = null;
  public starsError: string = '';
  public isSaving: boolean = false;
  public statusesList: string[] = ['watched', 'progress', 'feature'];

  constructor(
    private _dialogRef: MatDialogRef<AddAnimeComponent>,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: IAddEditAnime
  ) { }

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.form = this._fb.group({
      name: [this?.data?.name || '', Validators.required],
      nameUa: [this?.data?.nameUA || '', Validators.required],
      starsCount: [
        this?.data?.stars || null,
        [Validators.required, Validators.max(10), Validators.min(1)],
      ],
      minutes: [
        this?.data?.time || null,
        [Validators.required, Validators.min(1)],
      ],
      genres: [this?.data?.genres || ''],
      status: [this?.data?.status || '', Validators.required],
    });
  }

  public saveHandler(): void {
    if (!this.form?.valid) {
      return;
    }

    this.isSaving = true;

    const formValues = this.form?.value;

    const requestBody: IAddEditAnime = {
      name: formValues.name,
      nameUA: formValues?.nameUa,
      stars: formValues?.starsCount,
      status: formValues?.status,
      genres: formValues?.genres,
      time: formValues?.minutes,
      id: this?.data?.id
    };

    this._save(requestBody);
  }

  private _save(requestBody: IAddEditAnime): void {
    this.isSaving = false;
    this._dialogRef.close(requestBody);
    this._cdr.markForCheck();
  }
}
