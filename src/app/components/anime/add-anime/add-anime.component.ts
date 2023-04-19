import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

import { IAddEditAnime } from 'src/app/components/anime/anime.mode';

import { AnimeService } from '../service/anime.service';

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
    @Inject(MAT_DIALOG_DATA) public data: IAddEditAnime,
    private _dialogRef: MatDialogRef<AddAnimeComponent>,
    private _cdr: ChangeDetectorRef,
    private _animeService: AnimeService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this?.data?.name || '', Validators.required),
      nameUa: new FormControl(this?.data?.nameUA || '', Validators.required),
      starsCount: new FormControl(this?.data?.stars || null, [
        Validators.required,
        Validators.max(10),
        Validators.min(1),
      ]),
      minutes: new FormControl(this?.data?.time || null, [
        Validators.required,
        Validators.min(1),
      ]),
      genres: new FormControl(this?.data?.genres || ''),
      status: new FormControl(this?.data?.status || '', Validators.required),
    });
  }

  public saveHandler(): void {
    if (!this.form?.valid) return;

    this.isSaving = true;

    const formValues = this.form?.value;

    let requestBody: IAddEditAnime = {
      name: formValues.name,
      nameUA: formValues?.nameUa,
      stars: formValues?.starsCount,
      status: formValues?.status,
      genres: formValues?.genres,
      time: formValues?.minutes,
    };

    if (this?.data?.id) {
      const id: string = this.data.id;
      this._edit(requestBody, id);
    } else {
      this._save(requestBody);
    }
  }

  private _edit(requestBody: IAddEditAnime, id: string): void {
    this._animeService
      .editAnime(requestBody, id)
      .pipe(take(1))
      .subscribe((res) => {
        this._dialogRef.close(res);
        this.isSaving = false;
      });
  }

  private _save(requestBody: IAddEditAnime): void {
    this._animeService
      .addAnime(requestBody)
      .pipe(take(1))
      .subscribe((res) => {
        this.isSaving = false;
        this._dialogRef.close(res);
      });
  }
}
