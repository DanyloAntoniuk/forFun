import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {
  pageTitle: string;

  constructor(private router: Router) {
    // Init title.
    const titleSegments = this.router.url.split('/');
    this.pageTitle = this.transformTitle(titleSegments[titleSegments.length - 1]);
  }

  ngOnInit() {
    // Change title on navigation.
    this.router.events.pipe(
      filter((e: Event) => e instanceof NavigationEnd)
    ).
    subscribe(() => {
      const titleSegments = this.router.url.split('/');
      this.pageTitle = this.transformTitle(titleSegments[titleSegments.length - 1]);
    })
  }

  private transformTitle(title: string): string {
    // Remove all encoded characters and from string and make it title case.
    const transformedTitle = decodeURI(title.charAt(0).toUpperCase() + title.slice(1));
  
    if (transformedTitle.indexOf('-') !== -1) {
      return transformedTitle.replace('-', ' ');
    }

    return transformedTitle;
  }

}
