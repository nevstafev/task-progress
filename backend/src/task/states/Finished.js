import BaseState from '../BaseState.js';

export default class Finishing extends BaseState {
  name = 'finished';

  start() {
    this.next('inProgress');
  }

  getActions() {
    return ['start'];
  }
}