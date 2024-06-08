import { Component } from '@angular/core';
import { Bitrix24Service } from './services/bitrix24.service';
import { ApiService } from './services/api.service';
import { BitrixBatch } from '../api/bitrix';
import stickers, { ISticker, IStickerPack, marketplace } from '../packs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  public linkToApp: string = '';
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
  public size: number = 100;

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

    const RestCall = this.bitrixService.BX24.createBatch();
    RestCall.batch({
      appInfo: ['app.info'],
    })
      .then(({ appInfo }: any) => {
        this.linkToApp = `${this.bitrixService.BX24.getDomain(true)}/marketplace/app/${appInfo.CODE}/`;
      })
      .catch(console.warn);

    this.bitrixService.BX24.bind(window, 'keydown', (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyT') {
        e.preventDefault();
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

  getList(list: ISticker[]) {
    return list.filter((sticker: ISticker) => {
      return this.apiService.isShowSticker(sticker.icon);
    });
  }

  sendMessage(sticker: ISticker) {
    const icon: string = sticker.icon;
    const size: string | number = sticker.size || this.size;
    const title: string = sticker.title || 'Noname Sticker';
    const { options } = this.bitrixService.BX24.placement.info();
    const batch = new BitrixBatch(this.bitrixService.BX24);

    return batch
      .sendMessage(
        options.dialogId,
        `[icon=${this.getIcon(icon)} size=${size} title=${title}]`,
      )
      .then(() => {
        this.apiService.addStickerRecent(sticker);
      })
      .catch(console.warn);
  }

  getStyle(size: number | string = this.size) {
    return {
      height: `${size}px`,
      cursor: 'pointer',
    };
  }

  getIcon(icon: string) {
    const site = [window.location.origin, window.location.pathname]
      .join('')
      .replace('index.html', '');
    const fullPath = [site, 'assets/', icon].join('');
    return icon.includes('http') ? icon : fullPath;
  }
}
