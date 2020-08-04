import BaseState from '../BaseState.js';

export default class Cancelled extends BaseState {
  name = 'cancelled';

  start() {
    this.next('inProgress');
  }

  getActions() {
    return ['start'];
  }
}