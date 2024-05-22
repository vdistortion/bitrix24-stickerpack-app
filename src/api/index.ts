import { IStickerPack } from '../packs';

export default {
  get() {
    const value = window.localStorage.getItem('bitrix24-stickers');
    return value ? JSON.parse(value) : [];
  },
  set(data: IStickerPack[]) {
    const value = JSON.stringify(data);
    window.localStorage.setItem('bitrix24-stickers', value);
  },
};
