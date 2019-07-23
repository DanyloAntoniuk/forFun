import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class TitleService {
  constructor(
    private router: Router,
    private titleService: Title,
  ) { }

  static transformeTitle(title: string): string {
    // Remove all encoded characters from string and make it title case.
    const transformedTitle = decodeURI(title.charAt(0).toUpperCase() + title.slice(1));

    if (transformedTitle.indexOf('-') !== -1) {
      return transformedTitle.replace('-', ' ');
    }

    return transformedTitle;
  }

  init() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
          return this.router.url.split('/').reduce((previousValue, currentvalue) => {
            if (previousValue && currentvalue) {
              previousValue = `${previousValue} | `;
            }
            return previousValue + TitleService.transformeTitle(currentvalue);
          });
      }))
      .subscribe(pathString => this.titleService.setTitle(`${pathString}`));
  }
}
