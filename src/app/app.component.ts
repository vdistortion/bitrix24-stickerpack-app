import { Component } from '@angular/core';
import Bitrix24, {
  type IBitrix24Library,
  type IPlacementInfo,
} from 'bitrix24-library';
import { Bitrix24Service } from './services/bitrix24.service';
import { ChatComponent } from './chat.component';
import { DevPanelComponent } from './dev/dev-panel/dev-panel.component';
import { PageComponent } from './components/page/page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponent, DevPanelComponent, PageComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected isApp: boolean = false;
  protected isChat: boolean = false;

  constructor(private bitrixService: Bitrix24Service) {
    Bitrix24.init()
      .then((BX24: IBitrix24Library) => {
        if (!BX24) throw new Error();
        const info: IPlacementInfo = BX24.placement.info();
        this.bitrixService.BX24 = BX24;

        if (info.placement === 'DEFAULT') this.isApp = true;
        else if (info.placement === 'IM_SMILES_SELECTOR') this.isChat = true;
      })
      .catch(() => {
        this.isApp = true;
      });
  }
}
