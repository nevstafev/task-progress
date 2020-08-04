import BaseState from '../BaseState.js';

export default class Finishing extends BaseState {
  name = 'finishing';

  finish() {
    this.next('finished');
  }
}