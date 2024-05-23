import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { ISticker } from '../../../packs';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, IconComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent implements OnInit {
  @Output() public close: EventEmitter<void> = new EventEmitter<void>();
  @Output() public add: EventEmitter<ISticker> = new EventEmitter<ISticker>();
  public sizes: number[] = [100, 32, 27];
  public form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null),
      icon: new FormControl(null, [Validators.required]),
      size: new FormControl(0),
    });
  }

  onClose() {
    this.close.emit();
  }

  onAdd() {
    this.add.emit({
      icon: this.form.value.icon,
      title: this.form.value.title,
      size: this.sizes[this.form.value.size],
    });
    this.onClose();
  }
}
