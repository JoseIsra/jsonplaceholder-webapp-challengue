import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
  standalone: true,
  imports: [MatIcon, MatButtonModule],
})
export class ErrorDialogComponent {
  errorMessage = '';

  constructor(
    private ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
  ) {
    this.errorMessage = this.dynamicDialogConfig.data.message;
  }

  closeDialog() {
    this.ref.close();
  }
}
