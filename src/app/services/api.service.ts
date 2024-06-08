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
  private keyStickersHidden: string = `${this.keyStickers}-hidden`;
  private keyStickersRecent: string = `${this.keyStickers}-recent`;
  stickers: BehaviorSubject<ISticker[]> = new BehaviorSubject<ISticker[]>([]);
  stickersHidden: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  stickersRecent: BehaviorSubject<ISticker[]> = new BehaviorSubject<ISticker[]>(
    [],
  );

  constructor(private storageService: WebStorageService) {
    this.getStickers();
    this.getStickersHidden();
    this.getStickersRecent();

    this.stickers.subscribe((values) => {
      if (values.length) this.storageService.set(this.keyStickers, values);
      else this.storageService.remove(this.keyStickers);
    });

    this.stickersRecent.subscribe((values) => {
      if (values.length)
        this.storageService.set(this.keyStickersRecent, values);
      else this.storageService.remove(this.keyStickersRecent);
    });

    this.stickersHidden.subscribe((values) => {
      if (values.length)
        this.storageService.set(this.keyStickersHidden, values);
      else this.storageService.remove(this.keyStickersHidden);
    });

    window.addEventListener('storage', (event: StorageEvent) => {
      switch (event.key) {
        case this.keyStickersRecent:
          this.getStickersRecent();
          break;
        case this.keyStickersHidden:
          this.getStickersHidden();
          break;
        case this.keyStickers:
          this.getStickers();
      }
    });
  }

  // свои стикеры
  private getStickers() {
    this.stickers.next(this.storageService.get(this.keyStickers));
  }

  // недавние стикеры
  private getStickersRecent() {
    this.stickersRecent.next(this.storageService.get(this.keyStickersRecent));
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

  // скрытые стикеры
  private getStickersHidden() {
    this.stickersHidden.next(this.storageService.get(this.keyStickersHidden));
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

  // удаляем всё
  clearCache() {
    this.stickers.next([]);
    this.stickersHidden.next([]);
    this.stickersRecent.next([]);
  }
}
