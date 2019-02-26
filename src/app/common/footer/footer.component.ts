import { Component, OnInit, OnDestroy } from '@angular/core';

declare var window;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit() { }

  showNewsletterModal() {
    window.dojoRequire(["mojo/signup-forms/Loader"], function(L) { 
      L.start({"baseUrl":"mc.us20.list-manage.com","uuid":"e1cbee1c34a2033ce0ecbc155","lid":"6ef901cec6","uniqueMethods":true});
      document.cookie = "MCPopupClosed=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    });
  }

  ngOnDestroy() { }

}
