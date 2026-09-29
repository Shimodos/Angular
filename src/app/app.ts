import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TopBarModule } from './shared/modules/topBar/topBar.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarModule],
  templateUrl: './app.html',
})
export class App {
  // выводит надпись ангуляр
  title = signal('Angular');
}
