import { AppEvent } from './app.service';
import { State } from './app.states';

export class SetTextareaEvent extends AppEvent {

  constructor(payload: { focus: boolean, textChanged?: boolean }) {
    super(payload);
  }

  getNewState(state: State): State {
    return {
      ...state,
      textarea: {
        focus: this.payload.focus,
        textChanged: this.payload.textChanged ? this.payload.textChanged : false
      }
    };
  }
}

export class SetDeviceEvent extends AppEvent {

  constructor(payload: { info: any}) {
    super(payload);
  }

  getNewState(state: State): State {
    return {
      ...state,
      device: {
        info: this.payload.info
      }
    };
  }
}