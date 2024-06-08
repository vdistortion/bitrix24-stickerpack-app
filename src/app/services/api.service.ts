import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  stickersHidden: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  stickersRecent: BehaviorSubject<ISticker[]> = new BehaviorSubject<ISticker[]>(
    [],
  );

  constructor(private storageService: WebStorageService) {
    this.stickersRecent.subscribe((values) => {
      this.setStickersRecent(values);
    });

    this.stickersHidden.subscribe((values) => {
      this.setStickersHidden(values);
    });

    window.addEventListener('storage', (event: StorageEvent) => {
      switch (event.key) {
        case this.keyStickersRecent:
          this.stickersRecent.next(this.getStickersRecent());
          break;
        case this.keyStickersHidden:
          this.stickersHidden.next(this.getStickersHidden());
      }
    });
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

  private setStickersRecent(stickers: ISticker[]) {
    this.storageService.set(this.keyStickersRecent, stickers);
  }

  addStickerRecent(sticker: ISticker) {
    const stickers = this.stickersRecent.getValue();
    const isSticker = stickers.find(
      (item: ISticker) => item.icon === sticker.icon,
    );
    if (isSticker) return;
    stickers.unshift(sticker);
    this.stickersRecent.next(
      stickers.slice(0, environment.STICKERS_RECENT_COUNT),
    );
  }

  removeStickerRecent(sticker: ISticker) {
    this.stickersRecent.next(
      this.stickersRecent
        .getValue()
        .filter((item) => item.icon !== sticker.icon),
    );
  }

  private removeStickersRecent() {
    this.stickersRecent.next([]);
    this.storageService.remove(this.keyStickersRecent);
  }

  // скрытые стикеры
  private getStickersHidden() {
    return this.storageService.get(this.keyStickersHidden);
  }

  private setStickersHidden(values: string[]) {
    this.storageService.set(this.keyStickersHidden, values);
  }

  isShowSticker(icon: string) {
    const isShow = this.stickersHidden
      .getValue()
      .find((item: string) => item === icon);
    return !isShow;
  }

  toggleStickerHidden(checked: boolean, icon: string) {
    if (checked) this.showSticker(icon);
    else this.hiddenSticker(icon);
  }

  private hiddenSticker(icon: string) {
    this.stickersHidden.next([...this.stickersHidden.getValue(), icon]);
  }

  private showSticker(icon: string) {
    this.stickersHidden.next(
      this.stickersHidden.getValue().filter((item: string) => item !== icon),
    );
  }

  private removeStickersHidden() {
    this.stickersHidden.next([]);
    this.storageService.remove(this.keyStickersHidden);
  }

  // удаляем всё
  clearCache() {
    this.removeStickers();
    this.removeStickersHidden();
    this.removeStickersRecent();
  }
}
