import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class MessageService {
  private subject = new Subject<any>();

  success(message: string) {
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string) {
    this.subject.next({ type: 'error', text: message });
  }

  warn(message: string) {
    this.subject.next({ type: 'warn', text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
