/**
 * Copyleft (c) 2018-2019 Andalugeeks
 * 
 * Authors:
 * - Eduardo Amador <eamadorpaton@gmail.com>
 */

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Component, ViewChild, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { EPA } from '@andalugeeks/andaluh';
import { NavigatorExtended } from '../types/navigation.type';

@Component({
  selector: 'app-transcriptor',
  templateUrl: './transcriptor.component.html',
  styleUrls: ['./transcriptor.component.scss'],
})
export class TranscriptorComponent implements OnInit, OnDestroy {
  
  @ViewChild('textCasElement') textCasElement;
  @HostBinding('class.columns') grid: boolean = true;

  private epa: EPA;
  private subscription: Subject<string> = new Subject();
  
  showVafDrop: boolean = false;
  showShareModal: boolean = false;
  vaf: string = 'ç';
  vvf: string;
  from_options = [
    {label: 'ES', id: 'es'}
  ];
  to_options = [
    {label: 'AND', id: 'and'}
  ];
  from: any;
  to: any;

  casFromUrl: string = this._getParam("text");
  transcriptedValue: string = '';
  value: string = '';
  shareUrl: string = '';
  animated: string = '';
  share_text = {
    copy: 'TRANSCRIPT.SHARE.COPY',
    social: 'TRANSCRIPT.SHARE.SOCIAL',
    share: 'TRANSCRIPT.SHARE.SHARE',
    msg: 'TRANSCRIPT.SHARE.MSG',
    copied: 'TRANSCRIPT.SHARE.COPIED',
  };

  constructor(private http: Http) {
    this.epa = new EPA();
    this._setDefaultOptions();
    this._localSubcription();
  }

  ngOnInit() {}

  changeVaf(value) {
    this.vaf = value;
    this.subscription.next(this.textCasElement.nativeElement.value);
    this.showVafDrop = false;
  }

  toggleVVF() {
    if (this.vvf === undefined) {
      this.vvf = 'j';
    } else {
      this.vvf = undefined;
    }
    this.subscription.next(this.textCasElement.nativeElement.value);
  }

  resetVafAndVvf() {
    this.vaf = 'ç';
    this.vvf = undefined;
    this.subscription.next(this.textCasElement.nativeElement.value);
  }

  dropdownToggle() {
    this.showVafDrop = !this.showVafDrop;
  }

  copy() {
    const text = this.transcriptedValue;
    this._getShortURL()
      // If the URL shortener is unreachable (e.g. offline), still copy the transcription.
      .then((shortURL) => `${text} ${shortURL}`, () => text)
      .then((toCopy) => this._writeClipboard(toCopy))
      .then(() => {
        this.animated = 'animated';
        setTimeout(() => this.animated = '', 3000);
      })
      .catch(e => console.error(e));
  }

  share() {
    this._getShortURL()
      // If the URL shortener is unreachable, share the full link instead of doing nothing.
      .catch(() => this._getLongURL())
      .then((url) => {
        this.shareUrl = url;
        this.showShareModal = true;
      });
  }

  shareURL(url) {
    window.open(url, '_blank');
    this.showShareModal = false;
  }

  shareFacebook() {
    // Facebook automatically cuts long texts.
    const url = encodeURIComponent(this.shareUrl);
    const quote = encodeURIComponent(this.transcriptedValue);
    this.shareURL(`https://www.facebook.com/sharer.php?u=${url}&quote=${quote}`);
  }

  shareTwitter() {
    var tweetMaxText = this.transcriptedValue.slice(0, 254); // 254 text message + url = 280 (max tweet length)
    this.shareURL(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetMaxText)}&url=${encodeURIComponent(this.shareUrl)}`);
  }

  shareTelegram() {
    this.shareURL(`https://telegram.me/share?text=${encodeURIComponent(this.transcriptedValue)}&url=${encodeURIComponent(this.shareUrl)}`);
  }

  shareWhatsapp() {
    this.shareURL(`whatsapp://send?text=${encodeURIComponent(this.transcriptedValue + '\n\n' + this.shareUrl)}`);
  }

  closeModal(evt) {
    if (evt.target.id === 'modal-wrapper') {
      this.showShareModal = false;
      this.shareUrl = '';
    }
  }

  copyToClipboard(event) {
    event.target.select();
    document.execCommand("copy");
  }

  onKeyUp(casText: string) {
    this.subscription.next(casText);
  }

  private _localSubcription() {
    if (this.casFromUrl) {
      setTimeout(() => {
        const casText = this._decodeParam(this.casFromUrl);
        if (this.textCasElement) {
          this.textCasElement.nativeElement.value = casText;
        }
        this.transcriptedValue = this.epa.transcript(casText, this.vaf, this.vvf);
      }, 750);
    }
    
    this.subscription.pipe(
      debounceTime(0)
    ).subscribe(casText => {
      if (casText !== '') {
        this.transcriptedValue = this.epa.transcript(casText, this.vaf, this.vvf);
      } else {
        this.transcriptedValue = '';
      }
    });
  }

  private _getShortURL(): Promise<string> {
    const URL_API = 'https://s.andaluh.es/yourls-api.php?signature=d387956c6c&action=shorturl&url=';
    const URL = this._getLongURL();
    return new Promise((resolve, reject) => {
      this.http.get(`${URL_API}${encodeURIComponent(URL)}`).subscribe((response) => {
        const text = response.text();
        const xml = (new DOMParser()).parseFromString(text, 'text/xml');
        const urlElement = xml.querySelector('shorturl');
        if (urlElement) {
          resolve(urlElement.textContent);
        } else {
          reject('Error: Short URL was not created.');
        }
      }, (err) => reject(err));
    });
  }

  private _getLongURL(): string {
    const casText = this.textCasElement ? this.textCasElement.nativeElement.value : '';
    return 'https://andaluh.es/transcriptor/#' + `?text=${encodeURI(casText).replace(/&/g, '%26').replace(/#/g, '%23')}`;
  }

  private _writeClipboard(text: string): Promise<void> {
    const nav = navigator as NavigatorExtended;
    if (nav.clipboard && nav.clipboard.writeText) {
      // The async Clipboard API can be rejected by the WebView (e.g. user activation
      // expired while waiting for the short URL); fall back to execCommand.
      return nav.clipboard.writeText(text).catch(() => this._execCommandCopy(text));
    }
    return this._execCommandCopy(text);
  }

  private _execCommandCopy(text: string): Promise<void> {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok ? Promise.resolve() : Promise.reject(new Error('Copy to clipboard failed.'));
  }

  // NOTE: this could come from a JSON file where all tthe options will be defined
  private _setDefaultOptions() {
    this.from = {label: 'ES', id: 'es'};
    this.to = {label: 'AND', id: 'and'};
  }

  private _decodeParam(value: string): string {
    try {
      return decodeURIComponent(value);
    } catch (e) {
      return value; // malformed escape sequence: use it verbatim
    }
  }

  private _getParam(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
      return "";
    else
      return results[1];
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
