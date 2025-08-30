import { Injectable, Type } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class DialogTriggerService {
  constructor(private dialogService: DialogService) {}

  triggerDefaulDialog(component: Type<any>, config?: DynamicDialogConfig) {
    return this.dialogService.open(component, {
      showHeader: false,
      dismissableMask: false,
      modal: true,
      focusOnShow: false,
      contentStyle: {
        padding: '20px',
        borderRadius: '24px',
        display: 'grid',
        placeContent: 'center',
      },
      ...config,
    });
  }
}
