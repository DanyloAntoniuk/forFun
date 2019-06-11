import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'src/app/shared/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: string;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
