import { Component } from '@angular/core';

@Component({
  selector: 'app-add-anime',
  templateUrl: './add-anime.component.html',
  styleUrls: ['./add-anime.component.scss']
})
export class AddAnimeComponent {


  public save(): void {
    console.log('must be save')
  }
}
