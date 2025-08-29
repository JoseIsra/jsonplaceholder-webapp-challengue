import { ModuleWithProviders, NgModule } from '@angular/core';
import { ICONS } from './icons';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
})
export class NgMaterialModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    ICONS.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.setPath(`public/icons/${icon.url}`),
      );
    });
  }

  setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgMaterialModule,
    } as ModuleWithProviders<any>;
  }
}
