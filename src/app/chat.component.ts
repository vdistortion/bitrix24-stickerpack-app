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
  public size: number = 100;
  private readonly $BX24: any = null;

  constructor(
    private bitrixService: Bitrix24Service,
    private apiService: ApiService,
  ) {
    this.customStickers.list = this.apiService.getStickers();
    this.$BX24 = this.bitrixService.BX24;

    const RestCall = this.$BX24.createBatch();
    RestCall.batch({
      appInfo: ['app.info'],
    })
      .then(({ appInfo }: any) => {
        this.linkToApp = `${this.$BX24.getDomain(true)}/marketplace/app/${appInfo.CODE}/`;
      })
      .catch(console.warn);

    this.bitrixService.BX24?.bind(window, 'keydown', (e: KeyboardEvent) => {
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

  sendMessage(
    icon: string,
    title: string = 'Noname Sticker',
    size: number | string = this.size,
  ) {
    const { options } = this.$BX24.placement.info();
    const batch = new BitrixBatch(this.$BX24);

    return batch
      .sendMessage(
        options.dialogId,
        `[icon=${this.getIcon(icon)} size=${size} title=${title}]`,
      )
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
