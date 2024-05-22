import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { ISticker } from '../../../packs';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [FormsModule, ButtonComponent, IconComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent {
  @Output() public close: EventEmitter<void> = new EventEmitter<void>();
  @Output() public add: EventEmitter<ISticker> = new EventEmitter<ISticker>();
  public sizes: number[] = [100, 32, 27];
  public size: number = 0;
  public icon: string = '';
  public title: string = '';

  onClose() {
    this.close.emit();
  }

  onAdd() {
    this.add.emit({
      icon: this.icon,
      title: this.title,
      size: this.sizes[this.size],
    });
    this.onClose();
  }
}
