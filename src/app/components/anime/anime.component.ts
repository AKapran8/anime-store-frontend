import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAnimeComponent } from './add-anime/add-anime.component';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimeComponent implements OnInit {

  constructor(private _dialog: MatDialog){}

  ngOnInit(): void {
    this.openDialog();
  }

  public openDialog(): void {
    const dialogRef = this._dialog.open(AddAnimeComponent)
    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
    })
  }
}
