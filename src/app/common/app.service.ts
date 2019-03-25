import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { State } from './app.states';

const initialState: State = {
  textarea: {
    focus: false,
    textChanged: false
  },
  device: {
    info: null
  }
};

export abstract class AppEvent {
    constructor(public payload?: any) {}

    abstract getNewState(state: State): State;
}


export class AppService {

  private app: BehaviorSubject<State> = new BehaviorSubject<State>(initialState);
  private app$: Observable<State> = this.app
    .asObservable()
    .pipe(
      distinctUntilChanged()
    );

  observe(): Observable<State> {
    return this.app$;
  }

  dispatch(event: AppEvent): void {
    this.app.next(event.getNewState(this.app.getValue()));
  }

  getCurrentValue() {
    return this.app.getValue();
  }

  reset() {
    this.app.next(initialState);
  }
}
