import { Component, Input } from '@angular/core';
import {
  mdiCloseCircle,
  mdiOpenInNew,
  mdiPlusThick,
  mdiDownload,
  mdiReload,
  mdiCached,
  mdiGithub,
  mdiRobotDead,
  mdiRobotHappy,
} from '@mdi/js';

const icons: { [key: string]: string } = {
  mdiCloseCircle,
  mdiOpenInNew,
  mdiPlusThick,
  mdiDownload,
  mdiReload,
  mdiCached,
  mdiGithub,
  mdiRobotDead,
  mdiRobotHappy,
};

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input({ required: true }) public path: string;
  @Input() public size: number = 24;
  @Input() public scale: number = 1;

  get d(): string {
    return icons[this.path];
  }

  get viewBox() {
    return `0 0 ${this.size} ${this.size}`;
  }
  get styles() {
    return {
      transform: `scale(${this.scale}, ${this.scale})`,
    };
  }
}
