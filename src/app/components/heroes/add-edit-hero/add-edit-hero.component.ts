import { Component, Inject, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { mimeTypeValidator } from './../image.validator';

import { AnimeService } from '../../anime/service/anime.service';
import { HeroesService } from '../service/heroes.service';
import {
  IAddEditHeroDialogData,
  IAddEditHero,
} from 'src/app/components/heroes/hero.model';
import { IAnimeForHero } from '../../anime/anime.model';

import { SnackbarService } from '../../snackbar/snackbar.service';

@Component({
  selector: 'app-add-edit-hero',
  templateUrl: './add-edit-hero.component.html',
  styleUrls: ['./add-edit-hero.component.scss'],
})
export class AddEditHeroComponent implements OnInit {
  public form: FormGroup | null = null;
  public title: string = '';
  public imagePriview: string = '';
  public areAnimeListFetching: boolean = false;
  public animeList: IAnimeForHero[] = [];
  public imagePreviewUrl: string = '';
  public isSaving: boolean = false;
  public existedErrorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IAddEditHeroDialogData,
    private _dialogRef: MatDialogRef<AddEditHeroComponent>,
    private _animeService: AnimeService,
    private _heroesService: HeroesService,
    private _snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this._initComponent();
    this._initForm();
    this._getAnimeList();
  }

  private _initComponent(): void {
    if (this.data.type === 'add') {
      this.title = 'Add New Hero';
      this.existedErrorMessage = `You can't create a hero with the same name`;
    } else {
      this.title = 'Edit Hero';
      this.imagePriview = this.data.initialValue?.imageUrl || '';
      this.existedErrorMessage = `This name has already existed`;
    }
  }

  private _initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.data?.initialValue?.name || '', [
        Validators.required,
      ]),
      image: new FormControl(null),
      anime: new FormControl(this.data?.initialValue?.animeId || '', [
        Validators.required,
      ]),
    });

    if (this.data.type === 'add') {
      this.form.get('image')?.setValidators(Validators.required);
      this.form.get('image')?.setAsyncValidators(mimeTypeValidator);
    }
  }

  private _getAnimeList(): void {
    this.areAnimeListFetching = true;

    this._animeService
      .getAnimeListNames()
      .pipe(take(1))
      .subscribe((response) => {
        this.animeList = response.animeList;
        this.areAnimeListFetching = false;
      });
  }

  public onImagePicked(event: Event): void {
    this.imagePreviewUrl = '';
    this.form?.get('image')?.setValue(null);
    this.form?.get('image')?.updateValueAndValidity();

    const fileInput = event.target as HTMLInputElement;

    if (fileInput?.files?.[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;

        if (!this.form?.get('image')?.errors?.['invalidMimeType']) {
          this.form?.get('image')?.setValue(file);
          this.form?.get('image')?.updateValueAndValidity();
        }
      };
      reader.readAsDataURL(file);
    }
  }

  public saveHandler(): void {
    if (!this.form?.valid) return;
    const existed: boolean = this._getExistedHeroNameStatus();
    if (existed) {
      this._snackbarService.createErrorSnackbar(this.existedErrorMessage);
      return;
    }

    this.isSaving = true;
    const imageUrl: string =
      this.data.type === 'add' ? this._getImageUrl() : this.imagePriview;

    const requiestBody: IAddEditHero = {
      name: this.form?.value.name.trim(),
      image: this.form?.value.image || null,
      animeId: this.form?.value.anime,
      imageUrl: imageUrl,
    };

    if (this.data.type === 'add') this._save(requiestBody);
    if (this.data.type === 'edit') this._edit(requiestBody);
  }

  private _getExistedHeroNameStatus(): boolean {
    const heroName: string = this.form?.value.name.trim().toLowerCase();
    const animeId: string = this.form?.value.anime;

    const heroesList =
      this.animeList.find((a) => a.id === animeId)?.existedHeroes || [];

    const existedName: boolean =
      !!heroesList.find((h) => h.toLowerCase() === heroName) || false;

    return existedName;
  }

  private _save(body: IAddEditHero): void {
    this._heroesService
      .addHero(body)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.isSaving = false;
          this._dialogRef.close(res.hero);
          this._snackbarService.createSuccessSnackbar('Hero was added');
        },
        error: (err) => {
          this.isSaving = false;
        },
      });
  }

  private _edit(requiestBody: IAddEditHero): void {
    const id: string = this.data?.heroId || '';

    this._heroesService
      .editHero(requiestBody, id)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.isSaving = false;
          this._dialogRef.close(res.hero);
          this._snackbarService.createSuccessSnackbar('Hero was edited');
        },
        error: (err) => {
          this.isSaving = false;
        },
      });
  }

  private _getImageUrl(): string {
    const nameWithoutSpaces = this.form?.value.name
      .trim()
      .replace(/\s+/g, '')
      .toLowerCase();
    const id: string = this.form?.value.anime;
    const mime: string = this._getImageMimeType(this.form?.value.image.type);
    const imgName: string = `${nameWithoutSpaces}_${id}.${mime}`;

    return imgName || '';
  }

  private _getImageMimeType(str: string): string {
    let modifiedMime: string = str.split('/').pop() || '';
    return modifiedMime;
  }
}
