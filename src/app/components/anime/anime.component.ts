import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAnimeComponent } from './add-anime/add-anime.component';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeComponent implements OnInit, OnDestroy {
  public animeCount: number = 0;
  public searchControl: FormControl | null = null;
  public animeList: any[] = [];

  private _searchVaueChangesSub: Subscription | null = null;
  constructor(private _dialog: MatDialog, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._initSearchControl();
    this._initComponent();
  }

  private _initComponent(): void {
    this.animeList = [
      { name: 'The promised Neverland', genres: 'Lorem ipsum dolor sit amet' },
      { name: 'The promised Neverland1', genres: 'Lorem ipsum dolor sit amet' },
      { name: 'The promised Neverland2', genres: 'Lorem ipsum dolor sit amet' },
      { name: 'The promised Neverland3', genres: 'Lorem ipsum dolor sit amet' },
    ];
    this.animeCount = this.animeList.length;
    this._cdr.markForCheck();
  }

  private _initSearchControl(): void {
    this.searchControl = new FormControl('');

    this.searchControl?.valueChanges.subscribe((inputValue: string) => {
      console.log(inputValue);
    });
  }

  public addAnime(): void {
    const dialogRef = this._dialog.open(AddAnimeComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.animeList.push(res);
        this.animeCount = this.animeList.length;
        this._cdr.markForCheck();
      }
    });
  }

  public stopPropaganation(event: MouseEvent): void {
    event.stopPropagation();
  }

  public removeItem( anime: any): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: `Are you sure want to delete ${anime.name}`,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const index: any = this.animeList.indexOf(anime);
        this.animeList.splice(index, 1);
        this._cdr.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this._searchVaueChangesSub?.unsubscribe();
  }
}
