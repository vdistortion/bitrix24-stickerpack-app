import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { IconComponent } from '../icon/icon.component';
import { ISticker } from '../../../packs';

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

  onRemoveSticker(sticker: ISticker): void {
    this.removeSticker.emit(sticker);
  }

  onOpenPopup(): void {
    this.openPopup.emit();
  }
}
