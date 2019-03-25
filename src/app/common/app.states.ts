
export interface TextareaState {
  focus: boolean;
  textChanged: boolean;
}
  
export interface DeviceState {
  info: any;
}
  
export interface State {
  textarea: TextareaState;
  device: DeviceState;
}