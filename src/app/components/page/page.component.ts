import { Component } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';
import { GridComponent } from '../grid/grid.component';
import { Bitrix24Service } from '../../services/bitrix24.service';
import stickers, { ISticker, IStickerPack, marketplace } from '../../../packs';
import api from '../../../api';
import config from '../../../config';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [PanelComponent, GridComponent],
  templateUrl: './page.component.html',
})
export class PageComponent {
  public appName: string = 'bitrix24-stickerpack-app';
  public state: 'default' | 'marketplace' = 'default';
  public customStickers = {
    title: 'Свои стикеры',
    link: '',
    list: api.get(),
  };
  public popup: boolean = false;
  private readonly $BX24: any = null;

  constructor(private bitrixService: Bitrix24Service) {
    this.$BX24 = bitrixService.BX24;
    if (this.$BX24) this.$BX24.setTitle(config.global.appName);

    bitrixService.BX24?.bind(window, 'keydown', (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyT') {
        e.preventDefault();
        this.setTitle();
        this.state = this.isMarketplace ? 'default' : 'marketplace';
      }
    });
  }

  get stickers(): IStickerPack[] {
    return this.isMarketplace ? marketplace : stickers;
  }

  get isMarketplace() {
    return this.state === 'marketplace';
  }

  onSave() {
    api.set(this.customStickers.list);
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

  setTitle() {
    const title = this.isMarketplace
      ? 'Секретный бот 🤖'
      : config.global.appName;
    if (this.$BX24) this.$BX24.setTitle(title);
  }
}
