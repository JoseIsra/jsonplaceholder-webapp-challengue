import { SidebarComponent } from '@/presentation/shared/components/sidebar/sidebar.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
})
export class DashboardLayoutComponent {}
