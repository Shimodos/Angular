import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-error-message',
  standalone: false,
  template: '<div class="error-message">{{messageProp}}</div>',
})
export class ErrorMesegeComponent {
  @Input('message') messageProp: string = 'Something went wrong...';
}
