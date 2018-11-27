import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  kanye: any;
  events: any;
  timeseries: any;
  allMetrics: any;
  twitterMetric: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // TEST ALL APIS
    // GET ARTIST
    this.apiService.getArtists('Kanye West', 10)
      .subscribe(
        data => { this.kanye = data['artists'][0]; console.log(this.kanye); },
        err => console.log(err),
      // GET ARTIST EVENTS
        () => {
          this.getArtistEvents(this.kanye.id, 17167, 17531);
          // GET ARTISTS TIMESERIES
          this.getArtistTimeSeries(this.kanye.id, [28, 247], '2017-01-01', '2017-12-31');
          console.log('done loading artist data');
        }
      );

      this.createChart();
  }

  createChart() {
    const w = 400, h = 250;
    const padding = 4;
    const data = [50, 100, 150, 200, 250, 130, 210, 30, 170];

    const svg = d3.select('body')
                .append('svg')
                .attr('width', w)
                .attr('height', h);

    svg.selectAll('rect')
      .data(data)
      .enter()
        .append('rect')
        .attr('x', (d, i) => i * (w / data.length))
        .attr('y', d => h - d)
        .attr('width', w / data.length - padding)
        .attr('height', d => d)
        .attr('fill', 'green');

        svg.selectAll('text')
           .data(data)
           .enter()
              .append('text')
              .text(d => d)
              .attr('x', (d, i) => i * (w / data.length) + (w / data.length - padding) / 2)
              .attr('y', (d) => h - d + 20);
  }

  getArtistEvents(artistId, startDays, endDays) {
     this.apiService.getEvents(artistId, startDays, endDays)
        .subscribe(
          data => { this.events = data; console.log(this.events); },
          err => console.log(err),
          () => console.log('done loading event data')
        );
  }

  getArtistTimeSeries(id, metrics, startDate, endDate) {
      this.apiService.getTimeSeries(id, metrics, startDate, endDate)
      .subscribe(
        data => { this.timeseries = data; console.log(this.timeseries); },
        err => console.log(err),
        () => console.log('done loading timeseries data')
      );
  }

  getAllMetrics() {
    this.apiService.getAllMetrics()
      .subscribe(
        data => { this.allMetrics = data; console.log(this.allMetrics); },
        err => console.log(err),
        () => console.log('done loading all metrics data')
      );
  }

  getMetric(id) {
    this.apiService.getMetric(id)
      .subscribe(
        data => { this.twitterMetric = data; console.log(this.twitterMetric); },
        err => console.log(err),
        () => console.log('done loading twitter metric data')
      );
  }
}
