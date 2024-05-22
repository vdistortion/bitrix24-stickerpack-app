import { Injectable } from '@angular/core';
import { IBX24 } from '../../types/bx24';

@Injectable({ providedIn: 'root' })
export class Bitrix24Service {
  public BX24: IBX24 | null = null;

  constructor() {}
}
