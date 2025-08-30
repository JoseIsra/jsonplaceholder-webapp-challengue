import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SIDEBAR_ITEMS } from './sidebar.constants';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule],
})
export class SidebarComponent {
  readonly items = SIDEBAR_ITEMS;
  isMobileSidebar = false;
}
