import BaseState from '../BaseState.js';

export default class InProgress extends BaseState {
  name = 'inProgress';

  finish() {
    this.next('finishing');
  }
  cancel() {
    this.next('cancelling');
  }
  getActions() {
    return ['cancel'];
  }
}