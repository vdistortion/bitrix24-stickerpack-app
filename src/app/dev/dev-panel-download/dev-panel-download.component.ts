import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'dev-panel-download',
  standalone: true,
  imports: [],
  templateUrl: './dev-panel-download.component.html',
})
export class DevPanelDownloadComponent {
  get filename() {
    return [environment.APP_NAME, 'zip'].join('.');
  }
}
