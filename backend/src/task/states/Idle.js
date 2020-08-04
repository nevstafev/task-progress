import BaseState from '../BaseState.js';

export default class Idle extends BaseState {
  name = 'idle';

  start() {
    this.next('inProgress');
  }

  getActions() {
    return ['start'];
  }
}