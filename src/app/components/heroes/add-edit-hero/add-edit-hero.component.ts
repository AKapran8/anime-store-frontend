import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimeService } from '../../anime/service/anime.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-hero',
  templateUrl: './add-edit-hero.component.html',
  styleUrls: ['./add-edit-hero.component.scss'],
})
export class AddEditHeroComponent implements OnInit {
  public form: FormGroup | null = null;

  public animeList: { id: string; text: string }[] = [];
  public imagePreviewUrl: string = '';
  public imageTypeError: string = '';
  private _allowedTypes: string[] = ['image/jpeg', 'image/png'];

  constructor(
    private _cdr: ChangeDetectorRef,
    private _animeService: AnimeService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getAnimeList();
  }

  private _initForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      image: new FormControl(null),
      animeId: new FormControl('', Validators.required),
      quotes: new FormControl([]),
    });
  }

  private _getAnimeList(): void {
    this._animeService
      .getAnimeNames()
      .pipe(take(1))
      .subscribe((response) => {
        this.animeList = response.data;
        this._cdr.markForCheck();
      });
  }

  public navigateToHeroesList(): void {
    this._router.navigate(['heroes']);
  }

  public onImagePicked(event: Event): void {
    this.imageTypeError = '';
    this.imagePreviewUrl = '';
    this.form?.get('image')?.setValue(null);
    this.form?.get('image')?.updateValueAndValidity();

    const fileInput = event.target as HTMLInputElement;

    if (fileInput?.files?.[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      if (this._allowedTypes.includes(file.type)) {
        reader.onload = () => {
          this.imagePreviewUrl = reader.result as string;
          this.form?.get('image')?.setValue(file);
          this.form?.get('image')?.updateValueAndValidity();
          this._cdr.markForCheck();
        };
        reader.readAsDataURL(file);
      } else {
        this.imageTypeError = 'Only .jpg .jpeg .png are allowed';
      }
      this._cdr.markForCheck();
    }
    this._cdr.markForCheck();
  }

  public saveHandler(): void {
    if (!this.form?.valid) return;
  }
}
