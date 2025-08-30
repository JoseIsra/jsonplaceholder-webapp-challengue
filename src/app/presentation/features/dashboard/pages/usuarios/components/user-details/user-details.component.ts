import { UserModel } from '@/domain/models/users/users.response.model';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

type DynamicData = {
  userData?: UserModel;
};

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIcon],
})
export class UserDetailsComponent {
  userDetails: null | UserModel = null;

  constructor(
    private ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
  ) {
    const { userData } = this.dynamicDialogConfig.data as DynamicData;
    this.userDetails = userData as UserModel;
  }

  closeDialog() {
    this.ref.close();
  }
}
