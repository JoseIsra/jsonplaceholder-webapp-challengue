import { Injectable, Type } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class DialogTriggerService {
  constructor(private dialogService: DialogService) {}

  triggerDialogLeftSide(component: Type<any>, config?: DynamicDialogConfig) {
    return this.dialogService.open(component, {
      position: 'left',
      showHeader: false,
      dismissableMask: true,
      modal: true,
      height: '100%',
      width: '300px',
      focusOnShow: false,
      contentStyle: {
        width: '100%',
        padding: 0,
        borderRadius: '12px',
      },
      ...config,
    });
  }

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
