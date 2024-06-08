import { Injectable } from '@angular/core';
import { IBitrix24Library } from 'bitrix24-library';

@Injectable({ providedIn: 'root' })
export class Bitrix24Service {
  public BX24: IBitrix24Library;
}
