import { Injectable } from '@angular/core';
import { WebStorageService } from './webstorage.service';
import { ISticker } from '../../packs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private keyStickers: string = 'bitrix24-stickers';
  private keyStickersHidden: string = 'bitrix24-stickers-hidden';
  private keyStickersRecent: string = 'bitrix24-stickers-recent';
  private stickersHidden: string[] = [];
  stickersRecent: ISticker[] = [];

  constructor(private storageService: WebStorageService) {
    this.stickersRecent = this.getStickersRecent();
    this.stickersHidden = this.getStickersHidden();
  }

  // свои стикеры
  getStickers() {
    return this.storageService.get(this.keyStickers);
  }

  setStickers(stickers: ISticker[]) {
    this.storageService.set(this.keyStickers, stickers);
  }

  private removeStickers() {
    this.storageService.remove(this.keyStickers);
  }

  // недавние стикеры
  private getStickersRecent() {
    return this.storageService.get(this.keyStickersRecent);
  }

  private setStickersRecent() {
    this.storageService.set(this.keyStickersRecent, this.stickersRecent);
  }

  addStickerRecent(sticker: ISticker) {
    const isSticker = this.stickersRecent.find(
      (item: ISticker) => item.icon === sticker.icon,
    );
    if (isSticker) return;
    this.stickersRecent.unshift(sticker);
    this.stickersRecent = this.stickersRecent.slice(
      0,
      environment.STICKERS_RECENT_COUNT,
    );
    this.setStickersRecent();
  }

  removeStickerRecent(sticker: ISticker) {
    this.stickersRecent = this.stickersRecent.filter(
      (item) => item.icon !== sticker.icon,
    );
    this.setStickersRecent();
  }

  private removeStickersRecent() {
    this.stickersRecent = [];
    this.storageService.remove(this.keyStickersRecent);
  }

  // скрытые стикеры
  private getStickersHidden() {
    return this.storageService.get(this.keyStickersHidden);
  }

  private setStickersHidden() {
    this.storageService.set(this.keyStickersHidden, this.stickersHidden);
  }

  isShowSticker(icon: string) {
    const isShow = this.stickersHidden.find((item: string) => item === icon);
    return !isShow;
  }

  hiddenSticker(icon: string) {
    this.stickersHidden.push(icon);
    this.setStickersHidden();
  }

  showSticker(icon: string) {
    this.stickersHidden = this.stickersHidden.filter(
      (item: string) => item !== icon,
    );
    this.setStickersHidden();
  }

  private removeStickersHidden() {
    this.stickersHidden = [];
    this.storageService.remove(this.keyStickersHidden);
  }

  // удаляем всё
  clearCache() {
    this.removeStickers();
    this.removeStickersHidden();
    this.removeStickersRecent();
  }
}
