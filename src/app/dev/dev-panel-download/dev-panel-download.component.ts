import { Component } from '@angular/core';
import config from '../../../config';

@Component({
  selector: 'dev-panel-download',
  standalone: true,
  imports: [],
  templateUrl: './dev-panel-download.component.html',
})
export class DevPanelDownloadComponent {
  get dirname() {
    return [config.path, config.global.archiveName].join('');
  }

  get filename() {
    return `${config.global.appDirName}, ${new Date().toLocaleString()}.zip`;
  }
}
