import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit, OnDestroy {

  isActive: boolean = false;
  currentLang = 'es';

  @HostBinding('class.isTablet') _isTablet: boolean = true;

  constructor(private appService: AppService, private translate: TranslateService) {
    this.appService.observe()
      .subscribe(state => {
        if (state.device && state.device.info) {
          this._isTablet = state.device.info.isTablet;
        }
      });
  }

  ngOnInit() { }

  ngOnDestroy() { }

  langTo(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }

  toggleNav() {
    this.isActive = !this.isActive;
  }

}
