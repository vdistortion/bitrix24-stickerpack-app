import { Component } from '@angular/core';
import { Bitrix24Service } from './services/bitrix24.service';
import stickers, { IStickerPack, marketplace } from '../packs';
import api from '../api';
import { BitrixBatch } from '../api/bitrix';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  public state: 'default' | 'marketplace' = 'default';
  public customStickers: IStickerPack = {
    title: 'Свои стикеры',
    link: '',
    list: api.get(),
  };
  public size: number = 100;
  private readonly $BX24: any = null;

  constructor(private bitrixService: Bitrix24Service) {
    this.$BX24 = bitrixService.BX24;
    bitrixService.BX24?.bind(window, 'keydown', (e: KeyboardEvent) => {
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
    const fullPath = ['assets/', icon].join('');
    return icon.includes('http') ? icon : fullPath;
  }
}
