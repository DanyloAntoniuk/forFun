import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { timer, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  // Update date in real time.
  transform(value: string): Observable<string> {
    const minute = 60 * 1000;

    // @TODO Change interval to 1 day after 24h passed.
    return timer(0, minute).pipe(
        map(() => moment(value).fromNow()),
        distinctUntilChanged()
      );
  }

}
