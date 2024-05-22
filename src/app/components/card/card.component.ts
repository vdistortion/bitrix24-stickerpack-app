import { v4 as uuid } from 'uuid';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule, IconComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Output() public remove: EventEmitter<void> = new EventEmitter<void>();
  @Output() public toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input({ required: true }) public icon: string;
  @Input({ required: true }) public title: string;
  @Input({ required: true }) public size: string;
  @Input() public isCustom: boolean = false;
  public id: string = uuid();
  public active: boolean = true;

  onRemove(e: Event): void {
    e.stopPropagation();
    this.remove.emit();
  }

  onToggle(e: Event): void {
    this.toggle.emit((<HTMLInputElement>e.target).checked);
  }

  getIcon(icon: string) {
    const fullPath = ['assets/', icon].join('');
    return icon.includes('http') ? icon : fullPath;
  }
}
