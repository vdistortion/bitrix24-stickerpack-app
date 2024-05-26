import { Injectable } from '@angular/core';
import { WebStorageService } from './webstorage.service';
import { ISticker } from '../../packs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private keyStickers: string = 'bitrix24-stickers';
  private keyStickersHidden: string = 'bitrix24-stickers-hidden';
  private stickersHidden: string[] = [];

  constructor(private storageService: WebStorageService) {
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
    this.storageService.remove(this.keyStickersHidden);
  }

  // удаляем всё
  clearCache() {
    this.removeStickers();
    this.removeStickersHidden();
  }
}
