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
import { AnimeService } from './service/anime.service';
import { take } from 'rxjs/operators';
import { IAddEditAnime, IAnime, ITableData } from './model';
import { convertTimeToText, getStarsDescription } from './anime.functions';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeComponent implements OnInit, OnDestroy {
  public animeCount: number = 0;
  public searchControl: FormControl | null = null;
  public animeList: ITableData[] = [];

  private _searchVaueChangesSub: Subscription | null = null;
  constructor(
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef
  ) // private _animeService: AnimeService
  {}

  ngOnInit(): void {
    this._initSearchControl();
    this._initComponent();
  }

  private _initComponent(): void {
    const modified: IAnime[] = [
      {
        name: 'The promised Neverland',
        nameUA: 'Обещанный Неверленд',
        stars: 7,
        time: 529,
        genres: '',
        status: 'watched',
      },
      {
        name: 'One Punch Man',
        nameUA: 'Ванпанчмен',
        stars: 9,
        time: 576,
        genres: '',
        status: 'watched',
      },
    ];

    this._modifyList(modified);
  }

  private _modifyList(arr?: IAnime[]): void {
    if (arr?.length) {
      this.animeList = arr.map((el) => {
        const starsDescr = getStarsDescription(el.stars - 1);
        const timeText = convertTimeToText(el.time);

        return {
          ...el,
          starsDescr,
          timeText,
        };
      });
    } else {
      const modifiedData = this.animeList.map((el) => {
        const starsDescr = getStarsDescription(el.stars - 1);
        const timeText = convertTimeToText(el.time);
        return {
          ...el,
          starsDescr,
          timeText,
        };
      });
      this.animeList = [...modifiedData];
    }

    this.animeCount = this.animeList.length;
    this._cdr.markForCheck();
  }

  private _initSearchControl(): void {
    this.searchControl = new FormControl('');

    this.searchControl?.valueChanges.subscribe((inputValue: string) => {});
  }

  public addAnime(): void {
    const dialogRef = this._dialog.open(AddAnimeComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.animeList.push(res);
        this._modifyList();
      }
    });
  }

  public editItem(row: ITableData): void {
    const editRow: IAddEditAnime = {
      name: row.name,
      nameUA: row.nameUA,
      stars: row.stars,
      time: row.time,
      genres: row.genres,
      status: row.status,
    };

    const dialogRef = this._dialog.open(AddAnimeComponent, {
      data: editRow,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.animeList.push(res);
        this._modifyList();
      }
    });
  }

  public stopPropaganation(event: MouseEvent): void {
    event.stopPropagation();
  }

  public removeItem(anime: any): void {
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
