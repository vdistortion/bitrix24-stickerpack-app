import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../../services/api.service';
import { Bitrix24Service } from '../../services/bitrix24.service';
import { BitrixBatch } from '../../../api/bitrix';
import { ISticker } from '../../../packs';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ButtonComponent, PopupComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent implements OnInit {
  @Output() public addSticker: EventEmitter<ISticker> =
    new EventEmitter<ISticker>();
  @Output() public closePopup: EventEmitter<void> = new EventEmitter<void>();
  @Input() public isPopup: boolean = false;
  public isLoaded: boolean = false;
  public isInstall: boolean = false;
  protected readonly $BX24: any = null;
  private batch: any = null;

  constructor(
    private bitrixService: Bitrix24Service,
    private apiService: ApiService,
  ) {
    this.$BX24 = this.bitrixService.BX24;
  }

  ngOnInit(): void {
    if (this.$BX24) {
      this.batch = new BitrixBatch(this.$BX24);
      this.init();
    }
  }

  uninstall() {
    this.isLoaded = false;

    this.batch.deleteApp().then(() => {
      this.isInstall = false;
      this.isLoaded = true;
    });
  }

  install() {
    this.isLoaded = false;

    this.batch.app().then(() => {
      this.isInstall = true;
      this.isLoaded = true;
    });
  }

  init() {
    this.batch.getList().then(({ list }: any) => {
      const isApp = (<IPlacement[]>list).find(
        (item) => item.placement === 'IM_SMILES_SELECTOR',
      );

      this.isInstall = Boolean(isApp);
      this.isLoaded = true;
    });
  }

  onAddSticker(sticker: ISticker): void {
    this.addSticker.emit(sticker);
  }

  onClosePopup(): void {
    this.closePopup.emit();
  }

  clearCache() {
    this.apiService.clearCache();
  }
}
