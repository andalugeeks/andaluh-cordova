import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
var screen: any = window.screen;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(translate: TranslateService) {
    translate.setDefaultLang('and');

    this.deviceReady().then((device) => {
      if (window.outerWidth < 768) {
        // mobile - lock orientation to portrait
        screen.orientation.lock('portrait');
      }
    })
  }

  ngOnInit() {}

  deviceReady(): Promise<any> {
    return new Promise((resolve, reject) => {
      document.addEventListener("deviceready", (device: any) => {
        resolve(device);
      }, false);
    });
  }

}
