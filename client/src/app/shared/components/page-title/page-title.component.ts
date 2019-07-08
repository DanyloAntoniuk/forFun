import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TitleService } from 'src/app/core/title.service';

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
    this.pageTitle = TitleService.transformeTitle(titleSegments[titleSegments.length - 1]);
  }

  ngOnInit() {
    // Change title on navigation.
    this.router.events.pipe(
      filter((e: Event) => e instanceof NavigationEnd)
    ).
    subscribe(() => {
      const titleSegments = this.router.url.split('/');
      
      this.pageTitle = TitleService.transformeTitle(titleSegments[titleSegments.length - 1]);
    })
  }

}
