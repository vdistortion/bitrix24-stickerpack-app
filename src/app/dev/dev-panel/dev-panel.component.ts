import { Component } from '@angular/core';
import { DevPanelReloadComponent } from '../dev-panel-reload/dev-panel-reload.component';
import { DevPanelDownloadComponent } from '../dev-panel-download/dev-panel-download.component';
import { IconComponent } from '../../components/icon/icon.component';
import { Bitrix24Service } from '../../services/bitrix24.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'dev-panel',
  standalone: true,
  imports: [DevPanelReloadComponent, DevPanelDownloadComponent, IconComponent],
  templateUrl: './dev-panel.component.html',
  styleUrl: './dev-panel.component.scss',
})
export class DevPanelComponent {
  constructor(private bitrixService: Bitrix24Service) {}

  get isVisible() {
    if (!this.bitrixService.BX24) return false;
    return (<string[]>environment.TEST_DOMAINS).includes(
      `${this.bitrixService.BX24.getDomain()}`,
    );
  }
}
