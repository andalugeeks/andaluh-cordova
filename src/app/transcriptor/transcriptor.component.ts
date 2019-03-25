/**
 * Copyleft (c) 2018-2019 Andalugeeks
 * 
 * Authors:
 * - Eduardo Amador <eamadorpaton@gmail.com>
 */

import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Component, ViewChild, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../common/app.service';
import { SetTextareaEvent } from '../common/app.events';

import EPA from '@andalugeeks/andaluh';

@Component({
  selector: 'app-transcriptor',
  templateUrl: './transcriptor.component.html',
  styleUrls: ['./transcriptor.component.scss'],
})
export class TranscriptorComponent implements OnInit, OnDestroy {

  @ViewChild('textCasElement') textCasElement;
  @ViewChild('textAndElement') textAndElement;
  @ViewChild('andWrapperElement') andWrapperElement;
  @HostBinding('class.columns') grid: boolean = true;
  
  private epa: EPA;
  private subscription: Subject<string> = new Subject();
  private appSubscription: Subscription;
  
  showVafDrop: boolean = false;
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
  
  transcriptedValue: string = '';
  textLengthBeforeTyping: number = 0;
  _isTablet: boolean;

  constructor(private appService: AppService) {
    this.epa = new EPA();
    this._setDefaultOptions();
    this._localSubcription();

    this.appSubscription = this.appService.observe()
      .subscribe(state => {
        this._isTablet = state.device && state.device.info ? state.device.info.isTablet : null;
        if (this._isTablet ) {
          this.appSubscription.unsubscribe();
        }
      });
  }

  ngOnInit() {
    if (this.textAndElement) {
      this.textAndElement = this.textAndElement.nativeElement;
    }
    if (this.andWrapperElement) {
      this.andWrapperElement = this.andWrapperElement.nativeElement;
    }
  }

  pastedText(casText: string) {
    this.subscription.next(casText);
  }

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
  
  copyToClipboard(event) {
    event.target.select();
    document.execCommand("copy");
  }

  onKeyUp(casText: string) {
    this.subscription.next(casText);
  }

  onFocus() {
    this.textLengthBeforeTyping = this.transcriptedValue.length;
    this.appService.dispatch(new SetTextareaEvent({focus: true}));
  }

  onBlur() {
    const textChanged = (this.textLengthBeforeTyping !== this.transcriptedValue.length) && this.transcriptedValue.length >= 4;
    this.appService.dispatch(new SetTextareaEvent({focus: false, textChanged: textChanged}));
    if (textChanged && !this._isTablet) {
      setTimeout(() => {
        this.andWrapperElement.scrollIntoView();
      }, 250);
    }
  }

  private _localSubcription() {
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
  
  // NOTE: this could come from a JSON file where all tthe options will be defined
  private _setDefaultOptions() {
    this.from = {label: 'ES', id: 'es'};
    this.to = {label: 'AND', id: 'and'};
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
