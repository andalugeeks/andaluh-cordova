import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from './common/app.service';
import { SetDeviceEvent } from './common/app.events';

declare var window;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('contentEl') contentEl;
  @ViewChild('headerEl') headerEl;

  @HostBinding('class.isTablet') _isTablet: boolean = true;

  constructor(private appService: AppService, translate: TranslateService) {
    translate.setDefaultLang("and");

    document.addEventListener("deviceready", () => {
      this._isTablet = false;
      if (!(window.innerHeight <= 736 || window.innerWidth <= 736)) {
        this._isTablet = true;

        setTimeout(() => {
          window.screen.orientation.unlock();
        // 900ms delay avoid a bug which closes the app if the device orientation change right after the splash screen is gone
        }, 900); 
      }
      const device = {
        info: {...window.device, isTablet: this._isTablet, isMobile: !this._isTablet, orientation: window.screen.orientation.type}
      }
      this.appService.dispatch(new SetDeviceEvent(device));
    });
  }

  ngOnInit() {
    if (this.contentEl) {
      this.contentEl = this.contentEl.nativeElement;
    }
    if (this.headerEl) {
      this.headerEl = this.headerEl.nativeElement;
    }

    this.appService.observe()
      .subscribe(state => {
        this._isTablet = state.device && state.device.info ? state.device.info._isTablet : null;
        if (!this._isTablet || (
            this._isTablet && ['landscape-primary', 'landscape-secondary'].indexOf(window.screen.orientation.type) !== -1
          )
        ) {
          
          if (this.contentEl && this.headerEl) {
            if (!state.textarea.focus && !state.textarea.textChanged) {
              this.scroll(this.headerEl);
            } else if (state.textarea.focus) {
              this.scroll(this.contentEl);
            }
          }
        }
      });
  }

  scroll(el: HTMLElement) {
    if (!el) { return; }
    setTimeout(() => {
      el.scrollIntoView();
    }, 250);
  }
}
