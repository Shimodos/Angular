import { Component, Input, OnInit } from '@angular/core';

import { BackendErrorsInterface } from '../../../../types/backendErrors.interface';

@Component({
  selector: 'mc-home-page-error-messages',
  standalone: false,
  templateUrl: './backendErrorMassages.component.html',
  styleUrls: ['./backendErrorMassages.component.scss'],
})
export class BackendErrorMassagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface;
  errorMessages: string[];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map(
      (name: string) => ` ${this.backendErrorsProps[name].join(', ')}`,
    );
  }
}
