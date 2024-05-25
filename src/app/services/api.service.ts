import { Injectable } from '@angular/core';
import { WebStorageService } from './webstorage.service';
import { ISticker } from '../../packs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private keyStickers: string = 'bitrix24-stickers';
  private keyStickersHidden: string = 'bitrix24-stickers-hidden';

  constructor(private storageService: WebStorageService) {}

  getStickers() {
    return this.storageService.get(this.keyStickers);
  }

  setStickers(stickers: ISticker[]) {
    this.storageService.set(this.keyStickers, stickers);
  }

  removeStickers() {
    this.storageService.remove(this.keyStickers);
  }

  getStickersHidden() {
    return this.storageService.get(this.keyStickersHidden);
  }

  setStickersHidden(stickersIds: string[]) {
    this.storageService.set(this.keyStickersHidden, stickersIds);
  }

  removeStickersHidden() {
    this.storageService.remove(this.keyStickersHidden);
  }

  clearCache() {
    this.removeStickers();
    this.removeStickersHidden();
  }
}
