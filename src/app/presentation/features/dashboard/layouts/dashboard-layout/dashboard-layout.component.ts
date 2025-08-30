import { SidebarComponent } from '@/presentation/shared/components/sidebar/sidebar.component';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    MatButtonModule,
    MatIcon,
    DialogModule,
  ],
})
export class DashboardLayoutComponent {
  readonly LINKS: Record<string, string> = {
    CTS: 'https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/a0/a0436b94-670e-47eb-98ed-e75729db1e3e/TAR-0026.pdf?t=1696348229524',
    CASA: 'https://content-us-2.content-cms.com/9b3f67ef-5a9f-4acc-8ce8-bcc27fa681c7/dxdam/60/609d216e-ae86-4a08-a760-ed42abf711fb/TAR-0004.pdf?t=1696348229523',
  };

  mobileSidebarDialogVisible = signal(false);

  async donwloadFile(code: string) {
    const link = this.LINKS[code];
    const anchor = document.createElement('a');
    const response = await fetch(link);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    anchor.href = url;
    anchor.download = `${code}.pdf`;
    anchor.target = '_blank';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(anchor);
    }, 100);
  }

  handleOpenMobileSidebar() {
    this.mobileSidebarDialogVisible.set(true);
  }

  handleCloseMobileSidebar() {
    this.mobileSidebarDialogVisible.set(false);
  }
}
