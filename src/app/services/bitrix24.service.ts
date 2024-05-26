import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Bitrix24Service {
  public BX24: IBX24 | null = null;

  constructor() {}
}
