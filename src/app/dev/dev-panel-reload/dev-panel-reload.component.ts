import { Component } from '@angular/core';
import { Bitrix24Service } from '../../services/bitrix24.service';

@Component({
  selector: 'dev-panel-reload',
  standalone: true,
  imports: [],
  templateUrl: './dev-panel-reload.component.html',
})
export class DevPanelReloadComponent {
  constructor(private bitrixService: Bitrix24Service) {
    this.bitrixService.BX24?.bind(window, 'keydown', (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === 'KeyR') this.reload(e);
    });
  }

  reload(e: Event) {
    e.preventDefault();
    window.location.reload();
  }
}
