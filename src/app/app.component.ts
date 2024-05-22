import Bitrix24 from 'bitrix24-library';
import { Component } from '@angular/core';
import { Bitrix24Service } from './services/bitrix24.service';
import { ChatComponent } from './chat.component';
import { DevPanelComponent } from './dev/dev-panel/dev-panel.component';
import { PageComponent } from './components/page/page.component';
import { IBX24, IPlacement } from '../types/bx24';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponent, DevPanelComponent, PageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected isApp: boolean = false;
  protected isChat: boolean = false;

  constructor(private bitrixService: Bitrix24Service) {
    Bitrix24.init()
      .then((BX24: IBX24) => {
        const info: IPlacement = BX24.placement.info();
        bitrixService.BX24 = BX24;

        if (info.placement === 'DEFAULT') this.isApp = true;
        else if (info.placement === 'IM_SMILES_SELECTOR') this.isChat = true;
      })
      .catch(() => {
        this.isApp = true;
      });
  }
}
