import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
declare var device;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(translate: TranslateService) {
    translate.setDefaultLang('and');
  }

  ngOnInit() {
    document.addEventListener("deviceready", () => { 
      // alert(device.platform); 
    }, false); 

    window.addEventListener('keyboardWillHide', function () {
      // Describe your logic which will be run each time when keyboard is about to be closed.
      alert('hideee');
    });

    window.addEventListener('keyboardWillShow', function () {
      // Describe your logic which will be run each time when keyboard is about to be closed.
      alert('showww');
    });


    document.addEventListener('document - keyboardWillHide', function () {
      // Describe your logic which will be run each time when keyboard is about to be closed.
      alert('hideee');
    });

    document.addEventListener('document - keyboardWillShow', function () {
      // Describe your logic which will be run each time when keyboard is about to be closed.
      alert('showww');
    });
  }
}
