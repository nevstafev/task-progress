import BaseState from '../BaseState.js';

export default class Cancelling extends BaseState {
  name = 'cancelling';

  cancel() {
    this.next('cancelled');
  }
}