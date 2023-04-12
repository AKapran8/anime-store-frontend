import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAnimeComponent } from './../add-anime/add-anime.component';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  DeleteDialogComponent,
  IDeleteDialogData,
} from './../../delete-dialog/delete-dialog.component';
import { AnimeService } from './../service/anime.service';
import { take, map } from 'rxjs/operators';
import { IAddEditAnime, IAnime, IServerAnime, ITableData } from '../helpers/model';
import { convertTimeToText, getStarsDescription } from '../helpers/anime.functions';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeListComponent implements OnInit, OnDestroy {
  public animeCount: number = 0;
  public searchControl: FormControl | null = null;
  private _animeList: IAnime[] = [];
  public animeList: ITableData[] = [];

  private _searchValueChangesSub: Subscription | null = null;

  constructor(
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef,
    private _animeService: AnimeService
  ) {}

  ngOnInit(): void {
    this._getAnimeList();
    this._initSearchControl();
  }

  private _getAnimeList(): void {
    this._animeService
      .getAnimeList()
      .pipe(
        map((animeData) => {
          return this._mapAnimeListData(animeData.data);
        }),
        take(1)
      )
      .subscribe((res) => {
        if (res) {
          this._animeList = [...res];

          this._modifyList();
        }
      });
  }

  private _modifyList(): void {
    this.animeList = this._animeList.map((a) => {
      const starsDescr = getStarsDescription(a.stars - 1);
      const timeText = convertTimeToText(a.time);

      return {
        ...a,
        starsDescr,
        timeText,
      };
    });

    this.animeCount = this._animeList.length;
    this._cdr.markForCheck();
  }

  private _initSearchControl(): void {
    this.searchControl = new FormControl('');

    this._searchValueChangesSub = this.searchControl?.valueChanges.subscribe(
      (inputValue: string) => {
        console.log(inputValue);
      }
    );
  }

  public addAnime(): void {
    const dialogRef = this._dialog.open(AddAnimeComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.createdAnime) {
        const newElem: IAnime = this._getModifiedAnimeListItem(
          res.createdAnime
        );

        this._animeList.push(newElem);
        this._modifyList();
      }
    });
  }

  public editAnime(row: ITableData): void {
    const editRow: IAddEditAnime = {
      name: row.name,
      nameUA: row.nameUA,
      stars: row.stars,
      time: row.time,
      genres: row.genres,
      status: row.status,
      id: row.id,
    };

    const dialogRef = this._dialog.open(AddAnimeComponent, {
      data: editRow,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.updatedAnime) {
        const updatedAnime: IAnime = this._getModifiedAnimeListItem(
          res.updatedAnime
        );

        this._animeList = this._animeList.map((el) => {
          if (el.id === updatedAnime.id) return updatedAnime;
          return el;
        });

        this._modifyList();
      }
    });
  }

  public removeItem(anime: ITableData): void {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      data: {
        message: `Are you sure want to delete ${anime.name}`,
        type: 'ANIME',
        id: anime.id,
      } as IDeleteDialogData,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const index: number = this._animeList.findIndex(
          (a) => a.id === anime.id
        );

        this._animeList.splice(index, 1);
        this._modifyList();
      }
    });
  }

  public stopPropaganation(event: MouseEvent): void {
    event.stopPropagation();
  }

  private _mapAnimeListData(list: IServerAnime[] = []): IAnime[] {
    const modifiedList = list.map((a) => {
      return this._getModifiedAnimeListItem(a);
    });

    return [...modifiedList];
  }

  private _getModifiedAnimeListItem(elem: IServerAnime): IAnime {
    const modifiedEl: IAnime = {
      id: elem._id,
      name: elem.name,
      nameUA: elem.nameUA,
      stars: elem.stars,
      time: elem.time,
      genres: elem.genres,
      status: elem.status,
    };

    return modifiedEl;
  }

  ngOnDestroy(): void {
    this._searchValueChangesSub?.unsubscribe();
  }
}