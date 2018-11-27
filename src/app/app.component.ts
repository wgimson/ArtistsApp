import { Component, OnInit } from '@angular/core';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  kanye: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getArtists()
      .subscribe(
        data => { this.kanye = data; },
        err => console.log(err),
        () => console.log('done loading artist data')
      );
  }
}
