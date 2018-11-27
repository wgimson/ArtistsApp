import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiService {

  host = 'https://api.nextbigsound.com';

  constructor(private http: HttpClient) { }

  getArtists() {
    const path = '/search/v1/artists/?query=kanye+west&limit=10&access_token=eb74a82009cbc53c9b44866743633f9d';
    const url = this.host + path;
    return this.http.get(url);
  }
}
