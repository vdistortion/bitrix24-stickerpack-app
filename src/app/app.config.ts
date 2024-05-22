import { ApplicationConfig } from '@angular/core';
import { Bitrix24Service } from './services/bitrix24.service';

export const appConfig: ApplicationConfig = {
  providers: [Bitrix24Service],
};
