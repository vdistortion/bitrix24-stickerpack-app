import { v4 as uuid } from 'uuid';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Output() public remove: EventEmitter<void> = new EventEmitter<void>();
  @Input({ required: true }) public icon: string;
  @Input({ required: true }) public title: string;
  @Input({ required: true }) public size: string;
  @Input() public isRemoveButton: boolean = false;
  public active: boolean = true;
  public id: string = uuid();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.stickersHidden.subscribe((values) => {
      this.active = !values.includes(this.icon);
    });
  }

  onRemove(e: Event): void {
    e.stopPropagation();
    this.remove.emit();
  }

  onToggle(e: Event): void {
    const checked = (<HTMLInputElement>e.target).checked;
    this.apiService.toggleStickerHidden(checked, this.icon);
  }

  getIcon(icon: string) {
    const fullPath = ['assets/', icon].join('');
    return icon.includes('http') ? icon : fullPath;
  }
}
