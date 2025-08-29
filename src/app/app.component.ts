import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  template: `<router-outlet></router-outlet>`,
  imports: [RouterOutlet],
})
export class AppComponent {}
