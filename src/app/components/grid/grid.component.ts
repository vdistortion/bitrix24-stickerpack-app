import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { IconComponent } from '../icon/icon.component';
import { ISticker } from '../../../packs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CardComponent, IconComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent {
  @Output() public removeSticker: EventEmitter<ISticker> =
    new EventEmitter<ISticker>();
  @Output() public toggleSticker: EventEmitter<[number, boolean]> =
    new EventEmitter<[number, boolean]>();
  @Output() public openPopup: EventEmitter<void> = new EventEmitter<void>();
  @Input({ required: true }) public title: string;
  @Input({ required: true }) public list: ISticker[];
  @Input() public link: string = '';
  @Input() public isAdd: boolean = false;

  constructor(private apiService: ApiService) {}

  onRemoveSticker(sticker: ISticker): void {
    this.removeSticker.emit(sticker);
  }

  onToggleSticker(icon: string, checked: boolean): void {
    if (checked) {
      this.apiService.showSticker(icon);
    } else {
      this.apiService.hiddenSticker(icon);
    }
  }

  onOpenPopup(): void {
    this.openPopup.emit();
  }

  isActive(icon: string) {
    return this.apiService.isShowSticker(icon);
  }
}
