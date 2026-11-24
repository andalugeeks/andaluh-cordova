import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Tag <html> with the running platform (platform-android, platform-ios or
// platform-browser for the web build) so platform-specific tweaks live in CSS,
// e.g. `.platform-ios .foo { ... }`, instead of in forked files.
const cordova = (window as any).cordova;
document.documentElement.classList.add(`platform-${cordova ? cordova.platformId : 'browser'}`);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
