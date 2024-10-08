import { Component } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';
import { GridComponent } from '../grid/grid.component';
import { IconComponent } from '../icon/icon.component';
import { Bitrix24Service } from '../../services/bitrix24.service';
import { ApiService } from '../../services/api.service';
import stickers, {
  type ISticker,
  type IStickerPack,
  marketplace,
} from '../../../packs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [PanelComponent, GridComponent, IconComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent {
  public appName: string = environment.APP_NAME;
  public state: 'default' | 'marketplace' = 'default';
  public customStickers: IStickerPack = {
    title: 'Свои стикеры',
    link: '',
    list: [],
  };
  public recentStickers: IStickerPack = {
    title: 'Последние стикеры',
    link: '',
    list: [],
  };
  public popup: boolean = false;

  constructor(
    private bitrixService: Bitrix24Service,
    private apiService: ApiService,
  ) {
    this.apiService.stickers.subscribe((values) => {
      this.customStickers.list = values;
    });
    this.apiService.stickersRecent.subscribe((values) => {
      this.recentStickers.list = values;
    });
    if (this.bitrixService.BX24) {
      this.bitrixService.BX24.setTitle(environment.APP_NAME_RU);

      this.bitrixService.BX24.bind(window, 'keydown', (e: KeyboardEvent) => {
        if (e.ctrlKey && e.shiftKey && e.code === 'KeyT') {
          e.preventDefault();
          this.state = this.isMarketplace ? 'default' : 'marketplace';
          this.setTitle();
        }
      });
    }
  }

  get stickers(): IStickerPack[] {
    return this.isMarketplace ? marketplace : stickers;
  }

  get isMarketplace() {
    return this.state === 'marketplace';
  }

  onSave() {
    this.apiService.stickers.next(this.customStickers.list);
  }

  onToggleSticker(key: number, [index, checked]: [number, boolean]) {
    this.stickers[key].list[index].visible = checked;
  }

  onAddSticker(sticker: ISticker) {
    this.customStickers.list.push(sticker);
    this.popup = false;
    this.onSave();
  }

  onRemoveSticker(sticker: ISticker) {
    this.customStickers.list = this.customStickers.list.filter(
      (item: ISticker) => item !== sticker,
    );
    this.onSave();
  }

  onRemoveStickerRecent(sticker: ISticker) {
    this.apiService.removeStickerRecent(sticker);
  }

  setTitle() {
    if (this.bitrixService.BX24) {
      const title = this.isMarketplace
        ? 'Секретный бот 🤖'
        : environment.APP_NAME_RU;
      this.bitrixService.BX24.setTitle(title);
    }
  }
}
