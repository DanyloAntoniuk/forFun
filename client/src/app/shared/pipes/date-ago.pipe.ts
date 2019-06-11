import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { timer, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  transform(value: string): Observable<string> {
    const minute = 60 * 1000;

    return timer(0, minute).pipe(
        map(() => moment(value).fromNow()),
        distinctUntilChanged()
      );
  }

}
