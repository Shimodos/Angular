import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Store } from '@ngrx/store';

import { getCurrentUserAction } from './auth/store/actions/getCurrentUser.action';
import { TopBarModule } from './shared/modules/topBar/topBar.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarModule],
  templateUrl: './app.html',
})
export class App implements OnInit {
  // выводит надпись ангуляр
  constructor(private store: Store) {}
  title = signal('Angular');
  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());
  }
}
