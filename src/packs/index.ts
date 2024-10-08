import vtbBusiness from './pak0/vtb_business.json';
import devPack from './pak0/dev_pack.json';
import glvrdru from './pak0/glvrdru.json';
import businesschaika from './pak0/businesschaika.json';
import b2dStickers from './pak0/b2d_stickers.json';
import doryVk from './pak0/dory_vk.json';
import oficeVk from './pak0/ofice_vk.json';
import VKsmilies from './VKsmilies.json';
import itstickers from './itstickers.json';
import terebonk2 from './terebonk_2.json';
import odessastickers from './odessastickers.json';
import corrections from './corrections.json';
import designerhabits from './designerhabits.json';
import websokol from './websokol.json';
import other from './other.json';

export interface ISticker {
  title: string;
  icon: string;
  size?: string | number;
  visible?: boolean;
}

export interface IStickerPack {
  title: string;
  link: string;
  list: ISticker[];
}

const pak0: IStickerPack[] = [
  vtbBusiness,
  devPack,
  glvrdru,
  businesschaika,
  b2dStickers,
  doryVk,
  oficeVk,
];

export const marketplace: IStickerPack[] = [...pak0];

const defaultPack: IStickerPack[] = [
  VKsmilies,
  itstickers,
  terebonk2,
  odessastickers,
  corrections,
  designerhabits,
  websokol,
  other,
];

export default defaultPack;
