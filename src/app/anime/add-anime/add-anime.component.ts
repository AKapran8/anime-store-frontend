import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface IAddAnime {
  name: string;
  anotherName: string;
  stars: number;
  time: string;
  genres: string;
  status: string;
  episodesCount: number;
}

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

  constructor(private _fb: FormBuilder, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.form = this._fb.group({
      name: ['', Validators.required],
      nameUa: ['', Validators.required],
      starsCount: [
        null,
        [Validators.required, Validators.max(10), Validators.min(1)],
      ],
      minutes: [null, [Validators.required, Validators.min(1)]],
      genres: ['', Validators.required],
      status: ['', Validators.required],
      totalEpisodes: [null, [Validators.required, Validators.min(1)]],
    });
  }

  public saveHandler(): void {
    if (!this.form?.valid) {
      return;
    }
    this.isSaving = true;

    const formValues = this.form?.value;

    const time: string = this._convertTime(formValues.minutes);
    const genres: string = this._convertGenres(formValues.genres);

    const requestBody: IAddAnime = {
      name: formValues.name,
      anotherName: formValues.nameUa,
      stars: formValues.starsCount,
      status: formValues.status,
      episodesCount: formValues.totalEpisodes,
      time,
      genres
    };

    this._save(requestBody);
  }

  private _save(requestBody: IAddAnime): void {
    console.log(requestBody);
    this.isSaving = false;
    this._cdr.markForCheck();
  }

  private _convertTime(totalTimeValue: number): string {
    const hours: number = Math.floor(totalTimeValue / 60);
    const minutes: number = totalTimeValue % 60;

    const hoursText: string = `Hour${this._getTimeEnd(hours)}`;
    const minutesText: string = `minute${this._getTimeEnd(minutes)}`;

    const timeStr: string = `${hours} ${hoursText} and ${minutes} ${minutesText}`;

    return timeStr;
  }

  private _getTimeEnd(num: number): string {
    return num > 1 ? '(s)' : '';
  }

  private _convertGenres(genres: string = ''): string {
    return genres.replace(' ', ',');
  }
}
